const loadPhone = async(searchText, isShowAll) =>{
const res = await fetch(` https://openapi.programming-hero.com/api/phones?search=${searchText}`)
const data = await res.json()
let phones = data.data
// console.log(phones)
displayPhones(phones, isShowAll)
}

let displayPhones = (phones, isShowAll) =>{
    // console.log(phones)
let phoneContainer = document.getElementById('phone-container')
// clear previous data before adding new one
phoneContainer.innerHTML = ''

// display show all button if there are more than 12 phones
const showContainer = document.getElementById('show-container')
if(phones.length > 12 && !isShowAll){
  showContainer.classList.remove('hidden')
}
else{
  showContainer.classList.add('hidden')
}
console.log(isShowAll)
// show limited phones(first 12 phones)
if(!isShowAll){
  phones = phones.slice(0,12)
}
    phones.forEach(phone => {
        // console.log(phone)
        // 2- create a div
        const phoneCard = document.createElement('div')
        phoneCard.classList = 'card p-4 bg-gray-100 shadow-xl'
        // 3- set innerHtml
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
         <div class="card-body">
           <h2 class="card-title">${phone.phone_name}</h2>
           <p>If a dog chews shoes whose shoes does he choose?</p>
           <div class="card-actions justify-center">
             <button onclick ="handleShowDetails('${phone.slug}'); show_details_modal.showModal()" class="btn btn-primary">Show Details</button>
           </div>
         </div>
        `
        // 4- appendChild
        phoneContainer.appendChild(phoneCard)
    });
    loadingSpinner(false)
}

// show details
const handleShowDetails = async(id) =>{
const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
const data = await res.json()
const phone = data.data
showPhoneDetails(phone)
}

const showPhoneDetails = (phone) =>{
  console.log(phone)
  let phoneName = document.getElementById('phone-name')
  phoneName.innerText = phone.name
  let showDetailContainer = document.getElementById('show-detail-container')
  showDetailContainer.innerHTML = `
  <img src="${phone.image}" alt="" >
  <p><span class="font-bold">storage</span>: ${phone.mainFeatures.storage}</p>
  <p><span class="font-bold">display</span>: ${phone.mainFeatures.displaySize}</p>
  <p><span class="font-bold">chip</span>: ${phone.mainFeatures.chipSet}</p>
  <p><span class="font-bold">memory</span>: ${phone.mainFeatures.memory}</p>
  <p><span class="font-bold">slug</span>: ${phone.slug}</p>
  <p><span class="font-bold">releaseDate</span>: ${phone.releaseDate}</p>
  <p><span class="font-bold">brand</span>: ${phone.brand}</p>
  `
// show the modal
  show_details_modal.showModal()
}

// handle search button
const handleSearch = (isShowAll) =>{
  loadingSpinner(true)
   let searchField = document.getElementById('search-field')
   let searchText = searchField.value
   loadPhone(searchText)
}

// loading
const loadingSpinner = (isLoading) =>{
  const loadingSpinner = document.getElementById('loading')
  if(isLoading){
    loadingSpinner.classList.remove('hidden')
  }
  else{
    loadingSpinner.classList.add('hidden')
  }
}

// handle showAll
const handleShowAll = () => {
  handleSearch(true)
}
loadPhone()
