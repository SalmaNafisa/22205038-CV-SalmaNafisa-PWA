let db;
const request = indexedDB.open("db_komentar", 2);
let form = document.getElementById("form-indexed-db");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let nama = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let pesan = document.getElementById("pesan").value;

  if (db) {
    addData(db, nama, email, pesan);
  } else {
    console.error("Database belum siap.");
  }
});

// // Buat database dan tabel
request.onupgradeneeded = function (event) {
  db = event.target.result;
  let objectStore = db.createObjectStore("users", {
    keyPath: "id",
    autoIncrement: true,
  });

  objectStore.createIndex("nama", "nama", { unique: false });
  objectStore.createIndex("email", "email", { unique: true });
  objectStore.createIndex("pesan", "pesan", { unique: false });
};

// Handle error dan success saat membuka database
request.onsuccess = (event) => {
  db = event.target.result;
  console.log(`Indexed DB - Successfully`);
};

request.onerror = (event) => {
  console.error(`Oops error saat membuat indexedDB : ${event}`);
};

// Fungsi menambahkan data indexed DB
function addData(db, nama, email, pesan) {
  let transaction = db.transaction(["users"], "readwrite");
  let objectStore = transaction.objectStore("users");

  let user = { nama: nama, email: email, pesan: pesan };
  let addRequest = objectStore.add(user);

  addRequest.onsuccess = function () {
    console.log("Data berhasil ditambahkan");
    form.reset();
    getData();
  };
}

// Fungsi untuk mengambil dan menampilkan data Indexed DB
function getData() {
  let transaction = db.transaction(["users"], "readonly");
  let object_store = transaction.objectStore("users");
  let requestObjStore = object_store.openCursor();

  requestObjStore.onerror = function (event) {
    console.error(`Error fetching data : ${event}`);
  };

  requestObjStore.onsuccess = function (event) {
    let cursor = event.target.result;
    if (cursor) {
      let key = cursor.primaryKey;
      let value = cursor.value;
      console.log(key, value);
      cursor.continue();
    }
  };
}
