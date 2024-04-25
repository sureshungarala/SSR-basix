const addBtn = document.getElementById('add');
const items = document.getElementById('items');
const search = document.getElementById('search');
const filteredItems = document.getElementById('filtered-items');

//--------------------------------//
fetch('/items', {
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((res) => res.json())
  .then((data) => {
    const liItems = JSON.parse(data.items);
    console.log('total items ', liItems);
    const itemsFragment = document.createDocumentFragment();
    liItems.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      itemsFragment.appendChild(li);
    });
    items.appendChild(itemsFragment);
  });
//--------------------------------//
addBtn.addEventListener('click', () => {
  const item = window.prompt(
    'Enter item',
    `Item${items.childElementCount + 1}`
  );
  if (!item) return;
  console.log('item in prompt ', item);
  fetch('/add-item', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      item: item.replaceAll(/<\/?[^<>]*>/g, ''),
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const item = document.createElement('li');
      item.textContent = data.item;
      items.appendChild(item);
    })
    .catch((err) => console.log(err));
});
//--------------------------------//
searchBtn.addEventListener('click', () => {
  fetch(`/search?q=${search.value}`)
    .then((res) => res.json())
    .then((data) => {
      console.log('data ', data);
      const filteredData = JSON.parse(data.items);
      filteredItems.innerHTML = '';
      const filteredItemsFragment = document.createDocumentFragment();
      filteredData.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        filteredItemsFragment.appendChild(li);
      });
      filteredItems.appendChild(filteredItemsFragment);
    })
    .catch((err) => console.log(err));
});
//--------------------------------//
