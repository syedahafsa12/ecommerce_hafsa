import {defineField, defineType} from 'sanity'

export const eventType = defineType({
    
        name: 'product',
        type: 'document',
        title: 'Product',
        fields: [
          {
            name: 'name',
            type: 'string',
            title: 'Name of Product',
          },
          {
            name: 'images',
            type: 'array',
            title: 'Product Images',
            of: [{type: 'image'}],
          },
        ]
      
})