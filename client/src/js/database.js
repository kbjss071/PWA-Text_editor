import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// Export a function we will use to PUT to the database
export const putDb = async (id, content) => {
  // Create a connection to the database and version we want to use
  const jateDb = await openDB("jate", 1);
  
  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction("jate", "readwrite");

  // Open up the desired object store.
  const store = tx.objectStore("jate");

  // Use the .put() method on the store where id is given id and pass in the content
  const request = store.put({ id: id, jate: content });

  // Get confirmation of the request
  const result = await request;
  console.log("Data saved to database", result);
};

// Export a function we will use to GET from the database
export const getDb = async () => {
  // Create a connection to the database and version we want to use
  const jateDb = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction('jate', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .getAll() method to get all data in the database.
  const request = store.getAll();

  // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  return result.value;
};

initdb();
