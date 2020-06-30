let renderCardsToStore = (data, mainBox) => {
    data.docs.forEach((doc) => {
        let obj = doc.data();
        // console.log (obj)
        mainBox.innerHTML += `<div class="card" >
            <img src="${obj.url}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${obj.name}</h5>
            <p class="card-text">price: ${obj.price}\$</p>
            <a id="${obj.sku}" href="#" class="btn btn-info">Info / Add</a>
            </div>`;
    });
};

export let renderStorePage = (loader, mainBox) => {
  loader.style.display = "block";

  if (mainBox.innerText !== "") {
    if (document.body.children[6].innerHTML === "Store") {
      // console.log("ccc");
      document.body.children[6].remove();
    }
    //   console.log(document.body.children);
    mainBox.innerText = "";
    mainBox.classList.add("format-store");
    mainBox.insertAdjacentHTML(
      "beforebegin",
      '<h1 id="store-title">Store</h1>'
    );
    db.collection("products")
      .get()
      .then((data) => {
        loader.style.display = "none";
        renderCardsToStore(data, mainBox);
      });
  }
};

export let renederProductModal = (mainBox) => {
  db.collection("products")
    .get()
    .then((data) => {
      data.docs.forEach((doc) => {
        if (doc.data().sku === localStorage.getItem("id")) {
          console.log(doc.data());
          let obj = doc.data();
          mainBox.innerHTML += `<div id="product-card">
                <h5 id="product-close">+</h5>
                <div id="product-img">
                    <img src="${obj.url}" alt="...">
                </div>
                <div id="product-info">
                    <h1>${obj.name}</h1>
                    <h3>${obj.price} $</h3>
                    <div id="info">
                        <p>INFO:</p>
                        <p>${obj.info}</p>
                        <p>Dimension: ${obj.dimension.width} cm x ${obj.dimension.height} cm x ${obj.dimension.depth} cm</p>
                    </div>
                    <div id="product-btn">
                        <button><i class="fas fa-heart"></i></button>
                        <button><i class="fas fa-shopping-bag"></i></button>
                    </div>
                </div>  
            </div>`;
        }
      });
    });
};
