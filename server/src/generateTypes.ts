import { generateTypeScriptTypes } from 'graphql-schema-typescript'

generateTypeScriptTypes('./src/schema.graphql', './src/generated/gqlTypes.ts')
    .then(() => {
        console.log('DONE')
        process.exit(0)
    })
    .catch(err => {
        console.error(err)
        process.exit(1)
    })
