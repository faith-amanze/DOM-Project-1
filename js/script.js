// Outer wrapper of each product (the HTML also has an inner .card-body,
// so we target the direct child of .list-products to avoid double counting)
const ITEM = ".list-products > .card-body";

const totalEl = document.querySelector(".total");

// Turn text like "100 $" into the number 100
const toNumber = (text) => parseFloat(String(text).replace(/[^\d.]/g, "")) || 0;

// Recalculate the total from every product still in the cart
function updateTotal() {
  let total = 0;

  document.querySelectorAll(ITEM).forEach((item) => {
    const price = toNumber(item.querySelector(".unit-price").textContent);
    const qty = toNumber(item.querySelector(".quantity").textContent);
    total += price * qty;
  });

  totalEl.textContent = `${total} $`;
}

// Event delegation: a single listener handles all buttons
document.addEventListener("click", (event) => {
  const target = event.target;
  const item = target.closest(ITEM);
  if (!item) return;

  const qtyEl = item.querySelector(".quantity");
  const qty = toNumber(qtyEl.textContent);

  if (target.matches(".fa-plus-circle")) {
    // 1. Increase quantity
    qtyEl.textContent = qty + 1;
  } else if (target.matches(".fa-minus-circle")) {
    // 1. Decrease quantity (never below 0)
    if (qty > 0) qtyEl.textContent = qty - 1;
  } else if (target.matches(".fa-trash-alt")) {
    // 2. Delete the product
    item.remove();
  } else if (target.matches(".fa-heart")) {
    // 3. Like / unlike: toggle the heart color
    target.classList.toggle("liked");
    target.style.color = target.classList.contains("liked") ? "red" : "";
  }

  // 4. Keep the total in sync after every action
  updateTotal();
});

updateTotal();
