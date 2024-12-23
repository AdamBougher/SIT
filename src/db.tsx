import { createRxDatabase, addRxPlugin } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';

addRxPlugin(RxDBDevModePlugin);

async function createDb() {
  if (process.env.NODE_ENV !== "production") {
    await import('rxdb/plugins/dev-mode').then(
      module => addRxPlugin(module.RxDBDevModePlugin)
    );
  }
  const db = await createRxDatabase({
    name: 'mydatabase',
    storage: getRxStorageDexie(),
    ignoreDuplicate: true
  });

  const characterSchema = {
    version: 0,
    primaryKey: 'id',
    type: 'object',
    properties: {
      id: {
        type: 'string',
        maxLength: 100 // <- the primary key must have set maxLength
      },
      name: {
        type: 'string'
      },
      class: {
        type: 'string'
      },
      level: {
        type: 'number'
      },
      hp: {
        type: 'object',
        properties: {
          max: {
            type: 'number'
          },
          current: {
            type: 'number'
          }
        },
        required: ['max', 'current']
      },
      ac: {
        type: 'number'
      },
      speed: {
        type: 'object',
        properties: {
          walking: {
            type: 'number'
          },
          swimming: {
            type: 'number'
          },
          flying: {
            type: 'number'
          },
          burrowing: {
            type: 'number'
          },
          climbing: {
            type: 'number'
          }
        },
        required: ['walking', 'swimming', 'flying', 'burrowing', 'climbing']
      },
      info: {
        type: 'string'
      },
      abilities: {
        type: 'object',
        properties: {
          strength: {
            type: 'object',
            properties: {
              score: {
                type: 'number'
              },
              profec: {
                type: 'boolean'
              }
            },
            required: ['score', 'profec']
          },
          dexterity: {
            type: 'object',
            properties: {
              score: {
                type: 'number'
              },
              profec: {
                type: 'boolean'
              }
            },
            required: ['score', 'profec']
          },
          constitution: {
            type: 'object',
            properties: {
              score: {
                type: 'number'
              },
              profec: {
                type: 'boolean'
              }
            },
            required: ['score', 'profec']
          },
          intelligence: {
            type: 'object',
            properties: {
              score: {
                type: 'number'
              },
              profec: {
                type: 'boolean'
              }
            },
            required: ['score', 'profec']
          },
          wisdom: {
            type: 'object',
            properties: {
              score: {
                type: 'number'
              },
              profec: {
                type: 'boolean'
              }
            },
            required: ['score', 'profec']
          },
          charisma: {
            type: 'object',
            properties: {
              score: {
                type: 'number'
              },
              profec: {
                type: 'boolean'
              }
            },
            required: ['score', 'profec']
          }
        },
        required: ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma']
      }
    },
    required: ['id', 'name', 'class', 'level', 'hp', 'ac', 'speed', 'info', 'abilities']
  };

  // Drop the entire database if it exists
  await db.remove();

  const newDb = await createRxDatabase({
    name: 'mydatabase',
    storage: getRxStorageDexie(),
    ignoreDuplicate: true
  });

  await newDb.addCollections({
    characters: {
      schema: characterSchema
    }
  });

  return newDb;
}

export default createDb;