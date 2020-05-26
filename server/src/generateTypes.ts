import { generateTypeScriptTypes } from 'graphql-schema-typescript'
import { makeExecutableSchema } from 'graphql-tools'

import typeDefs from './schemas/index'

generateTypeScriptTypes(makeExecutableSchema({ typeDefs }), './src/generated/gqlTypes.ts')
    .then(() => {
        console.log('DONE')
        process.exit(0)
    })
    .catch(err => {
        console.error(err)
        process.exit(1)
    })
