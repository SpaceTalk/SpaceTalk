# backwards compatibility
if typeof Mongo is "undefined"
  Mongo = {}
  Mongo.Collection = Meteor.Collection

Mongo.Collection.prototype.friendlySlugs = (options = {}) ->
  collection = @

  if !_.isArray(options)
    options = [options]

  _.each options, (opts) ->
    if _.isString(opts)
      opts = {
        slugFrom: opts
      }

    defaults =
      slugFrom: 'name'
      slugField: 'slug'
      distinct: true
      updateSlug: true
      createOnUpdate: true
      debug: false
      transliteration: [
        {from: 'àáâäã',  to: 'a'}
        {from: 'æ',      to: 'ae'}
        {from: 'ç',      to: 'c'}
        {from: 'èéêëẽ',  to: 'e'}
        {from: 'ìíîï',   to: 'i' }
        {from: 'ñ',      to: 'n' }
        {from: 'òóôöõ',  to: 'o'}
        {from: 'ùúûü',   to: 'u'}
      ]

    _.defaults(opts, defaults)

    fields =
      slugFrom: String
      slugField: String
      distinct: Boolean
      updateSlug: Boolean
      createOnUpdate: Boolean
      debug: Boolean

    check(opts,Match.ObjectIncluding(fields))

    collection.before.insert (userId, doc) ->
      runSlug(doc,opts)
      return

    collection.before.update (userId, doc, fieldNames, modifier, options) ->
      #Don't do anything if this is a multi doc update
      options = options || {}
      if options.multi
        fsDebug(opts,"multi doc update attempted, can't update slugs this way, leaving.")
        return true

      modifier = modifier || {}
      modifier.$set = modifier.$set || {}

      #Don't do anything if the slugFrom field isn't present (before or after update)
      return true if !doc[opts.slugFrom]? and !modifier.$set[opts.slugFrom]?

      #See if the slugFrom has changed
      slugFromChanged = false
      if modifier.$set[opts.slugFrom]?
        if doc[opts.slugFrom] isnt modifier.$set[opts.slugFrom]
          slugFromChanged = true

      fsDebug(opts,slugFromChanged,'slugFromChanged')

      #Is the slug missing / Is this an existing item we have added a slug to? AND are we supposed to create a slug on update?
      if !doc[opts.slugField]? and opts.createOnUpdate
        fsDebug(opts,'Update: Slug Field is missing and createOnUpdate is set to true')

        if slugFromChanged
          fsDebug(opts,'slugFrom field has changed, runSlug with modifier')
          runSlug(doc, opts, modifier)
        else
          #Run the slug to create
          fsDebug(opts,'runSlug to create')
          runSlug(doc, opts, modifier, true)
          return true

      else
        # Don't change anything on update if updateSlug is false
        if opts.updateSlug is false
          fsDebug(opts,'updateSlug is false, nothing to do.')
          return true

        #Don't do anything if the slug from field has not changed
        if doc[opts.slugFrom] is modifier.$set[opts.slugFrom]
          fsDebug(opts,'slugFrom field has not changed, nothing to do.')
          return true

        runSlug(doc, opts, modifier)
        return true
      return true
    return
  runSlug = (doc, opts, modifier = false, create = false) ->
    fsDebug(opts,'Begin runSlug')
    fsDebug(opts,opts,'Options')
    fsDebug(opts,modifier, 'Modifier')
    fsDebug(opts,create,'Create')

    from = if create or !modifier then doc[opts.slugFrom] else modifier.$set[opts.slugFrom]

    fsDebug(opts,from,'Slugging From')

    slugBase = slugify(from, opts.transliteration)
    return false if !slugBase

    fsDebug(opts,slugBase,'SlugBase before reduction')

    if opts.distinct
      
      # Check to see if this base has a -[0-9999...] at the end, reduce to a real base
      slugBase = slugBase.replace(/(-\d+)+$/,'')
      fsDebug(opts,slugBase,'SlugBase after reduction')

      baseField = "friendlySlugs." + opts.slugField + ".base"
      indexField = "friendlySlugs." + opts.slugField + ".index"

      fieldSelector = {}
      fieldSelector[baseField] = slugBase

      sortSelector = {}
      sortSelector[indexField] = -1

      limitSelector = {}
      limitSelector[indexField] = 1

      result = collection.findOne(fieldSelector,
        sort: sortSelector
        fields: limitSelector
        limit:1
      )

      fsDebug(opts,result,'Highest indexed base found')

      if !result? || !result.friendlySlugs? || !result.friendlySlugs[opts.slugField]? || !result.friendlySlugs[opts.slugField].index?
        index = 0
      else
        index = result.friendlySlugs[opts.slugField].index + 1

      if index is 0
        finalSlug = slugBase
      else
        finalSlug = slugBase + '-' + index
    else
      #Not distinct, just set the base
      index = false
      finalSlug = slugBase

    fsDebug(opts,finalSlug,'finalSlug')

    if modifier or create
      fsDebug(opts,'Set to modify or create slug on update')
      modifier = modifier || {}
      modifier.$set = modifier.$set || {}
      modifier.$set.friendlySlugs = doc.friendlySlugs || {}
      modifier.$set.friendlySlugs[opts.slugField] = modifier.$set.friendlySlugs[opts.slugField] || {}
      modifier.$set.friendlySlugs[opts.slugField].base = slugBase
      modifier.$set.friendlySlugs[opts.slugField].index = index
      modifier.$set[opts.slugField] = finalSlug
      fsDebug(opts,modifier,'Final Modifier')

    else
      fsDebug(opts,'Set to update')
      doc.friendlySlugs = doc.friendlySlugs || {}
      doc.friendlySlugs[opts.slugField] = doc.friendlySlugs[opts.slugField] || {}
      doc.friendlySlugs[opts.slugField].base = slugBase
      doc.friendlySlugs[opts.slugField].index = index
      doc[opts.slugField] = finalSlug
      fsDebug(opts,doc,'Final Doc')
    return true

  fsDebug = (opts, item, label = '')->
    return if !opts.debug
    if typeof item is 'object'
      console.log "friendlySlugs DEBUG: " + label + '↓'
      console.log item
    else
      console.log "friendlySlugs DEBUG: " + label + '= ' + item

slugify = (text, transliteration) ->
  return false if !text?
  return false if text.length < 1
  text = text.toString().toLowerCase()
  _.each transliteration, (item)->
    text = text.replace(new RegExp('['+item.from+']','g'),item.to)
  return text
    .replace(/[^0-9a-z-]/g, '-') # Replace anything that is not 0-9, a-z, or - with -
    .replace(/\-\-+/g, '-')         # Replace multiple - with single -
    .replace(/^-+/, '')             # Trim - from start of text
    .replace(/-+$/, '');            # Trim - from end of text
