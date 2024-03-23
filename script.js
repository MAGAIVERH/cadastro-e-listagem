document.addEventListener("DOMContentLoaded", function () {
  const productForm = document.getElementById("product-form");
  const productList = document
    .getElementById("product-list")
    .querySelector("tbody");

  productForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const productName = document.getElementById("product-name").value;
    const productDescription = document.getElementById(
      "product-description"
    ).value;
    const productValue = document.getElementById("product-value").value;
    const productAvailable = document.getElementById("product-available").value;

    if (productAvailable === "nao") {
      alert("Produto não pode ser cadastrado. Insuficiente no estoque.");
      return;
    }

    addProduct(productName, productDescription, productValue, productAvailable);
    productForm.reset();
  });

  function addProduct(name, description, value, available) {
    const row = document.createElement("tr");
    row.innerHTML = `
                <td>${name}</td>
                <td>${description}</td>
                <td>${parseFloat(value).toFixed(2)}</td>
            `;
    productList.appendChild(row);
    sortProducts();
  }

  function sortProducts() {
    const rows = Array.from(productList.querySelectorAll("tr"));
    rows.sort((a, b) => {
      const valueA = parseFloat(a.querySelector("td:nth-child(3)").textContent);
      const valueB = parseFloat(b.querySelector("td:nth-child(3)").textContent);
      return valueA - valueB;
    });
    productList.innerHTML = "";
    rows.forEach((row) => productList.appendChild(row));
  }
});
