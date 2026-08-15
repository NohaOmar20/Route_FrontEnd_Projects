var contactNameInput = document.getElementById("contactName");
var contactPhoneInput = document.getElementById("contactPhone");
var contactEmailInput = document.getElementById("contactEmail");
var contactAddressInput = document.getElementById("contactAddress");
var contactGroupInput = document.getElementById("contactGroup");
var contactNotesInput = document.getElementById("contactNotes");
var contactFavoriteInput = document.getElementById("contactFavorite");
var contactEmergencyInput = document.getElementById("contactEmergency");
var allContactsContainer = document.getElementById("allContactsContainer");
var totalCount = document.getElementById("totalCount");
var favoriteCount = document.getElementById("favoriteCount");
var emergencyCount = document.getElementById("emergencyCount");

var FavoriteList = document.getElementById("FavoriteList");
var EmergencyList = document.getElementById("EmergencyList");

var saveContactBtn = document.getElementById("saveContactBtn");
var updateContactBtn = document.getElementById("updateContactBtn");

var searchInput = document.getElementById("searchInput");
var debounceTimer;

const nameRegex = /^[a-zA-Z\s]{2,50}$/;
const phoneRegex = /^01[0125][0-9]{8}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const contactNameError = document.getElementById("contactNameError");
const contactPhoneError = document.getElementById("contactPhoneError");
const contactEmailError = document.getElementById("contactEmailError");

//They are two separate steps in user interaction when update, and currentIndex acts as the bridge (or memory) between them.
var currentIndex = null; // Variable to store the index of the contact being updated
//When we retrieve the contacts from local storage, we need to parse the JSON string back into an array of objects.
var contacts=getLocalContacts();

var favoriteContacts=[];
var emergencyContacts=[];

function getLocalContacts(){
    return localStorage.getItem("contacts") ? JSON.parse(localStorage.getItem("contacts")) : [];
    // return JSON.parse(localStorage.getItem("contacts")) || [];
    // if (localStorage.getItem("contacts")) {
    //     contacts = JSON.parse(localStorage.getItem("contacts"));
    // } else{return [];}
}
// List of vibrant colors for the avatars
const avatarColors = [
    "#E91E63", // Pink/Red
    "#2196F3", // Blue
    "#9C27B0", // Purple
    "#E12AEC", // Magenta
    "#673AB7"  // Deep Purple
];

// Returns a random color from the list
function getRandomColor() {
    var randomIndex = Math.floor(Math.random() * avatarColors.length);
    return avatarColors[randomIndex];
}
function addContact(){
   
    var nameValue = contactNameInput.value.trim();
    var phoneValue = contactPhoneInput.value.trim();
    
    if (nameValue === "") {
        Swal.fire({
            icon: "error",
            title: "Missing Name",
            text: "Please enter a name for the contact!"
        });
        return; // Stops the function execution here
    }
    if (phoneValue === "") {
        Swal.fire({
            icon: "error",
            title: "Missing Phone",
            text: "Please enter a phone number!"
        });
        return; // Stops the function execution here
    }
  // regex(input validation)
      const isNameValid = validateName();
      const isPhoneValid = validatePhone();
      const isEmailValid = validateEmail();
    // Stop execution if any validation fails
    if (!isNameValid || !isPhoneValid || !isEmailValid) {
        return;
    }
    //  CHECK FOR DUPLICATE PHONE NUMBER
    var existingContact = contacts.find(function(c) {
        return c.contactPhone.trim() === phoneValue;
    });

    if (existingContact) {
        Swal.fire({
            icon: "error",
            title: "Duplicate Phone Number",
            text: `A contact with this phone number already exists: ${existingContact.contactName}`,
            confirmButtonColor: "#7066e0" 
        });
        return; // Stop function execution so the contact isn't added and modal stays open
    }
     var contact = {
        contactName: contactNameInput.value,
        contactPhone: contactPhoneInput.value,
        contactEmail: contactEmailInput.value,
        contactAddress: contactAddressInput.value,
        contactGroup: contactGroupInput.value,
        contactNotes: contactNotesInput.value,
        isFavorite: contactFavoriteInput.checked,
        isEmergency: contactEmergencyInput.checked,

        avatarBg: getRandomColor()
    };
    //local storage only stores strings, so we need to convert the contacts array to a JSON string before storing it in local storage. 
    contacts.push(contact);
    localStorage.setItem("contacts", JSON.stringify(contacts));
    // console.log(contact);
    displayContacts(contacts);
    //  CLOSE MODAL: Trigger a click on the Cancel button
    document.getElementById("cancelModalBtn").click();
    clearForm();
    Swal.fire({
        icon: "success",
        title: "Contact Added!",
        text: "The contact has been successfully added.",
        timer: 1500, 
        showConfirmButton: false
    });
    
}

function displayContacts(list){
    var contentToRender = "";
    //  Check if the list is empty
    if (!list || list.length === 0) {
        contentToRender = `
        <div class="col-12 py-5 text-center">
            <div class="d-inline-flex align-items-center justify-content-center bg-light rounded-4 mb-3" style="width: 80px; height: 80px;">
                <i class="fas fa-address-book text-secondary fs-1"></i>
            </div>
            <h4 class="h5 fw-bold text-secondary mb-1">No contacts found</h4>
            <p class="text-muted small mb-0">Click "Add Contact" to get started</p>
        </div>`;
        
        allContactsContainer.innerHTML = contentToRender;
        displayCounters();
        displayFeaturedContacts();
        return; // Exit early since there are no cards to loop through
    }
    for (var i = 0; i < list.length; i++) {
        contentToRender += `
        <div class="col-12 col-sm-6 col-md-6">
                <div class="card border-0 shadow-lg rounded-4 p-3 d-flex flex-column overflow-hidden">
                  <div class="card-body p-4 flex-grow-1">
                    <div class="d-flex align-items-center gap-3">
                      <div class="position-relative shrink-0">
                        <div class="rounded-4  d-flex align-items-center justify-content-center" style="width: 60px; height: 60px; font-size: 1.5rem; background-color: ${list[i].avatarBg};">
                          ${createavatar(list[i].contactName)}
                        </div>
                         ${list[i].isEmergency ? `
                            <span class="position-absolute top-100 start-100 translate-middle bg-danger border border-light rounded-circle text-center d-flex align-items-center justify-content-center" style="width: 20px; height: 20px;">
                          <i class="fa-solid fa-heart-pulse text-white" style="font-size: 0.5rem;"></i>
                        </span>
                        ` : ''}
                        ${list[i].isFavorite ? `
                            <span class="position-absolute top-0 start-100 translate-middle bg-gradient-orange border border-light rounded-circle text-center d-flex align-items-center justify-content-center" style="width: 20px; height: 20px;">
                          <i class="fas fa-star text-white" style="font-size: 0.5rem;"></i>
                        </span>
                        ` : ''}
                        
                         
                      </div>
                      <div class="min-w-0 flex-grow-1 pt-1">
                        <h3 class="h6 mb-1 fw-bold text-dark text-truncate">
                        ${list[i].contactName}
                        </h3>
                        <div class="d-flex align-items-center gap-2">
                          <span class="badge bg-primary-subtle text-primary rounded-1 p-2 d-flex align-items-center justify-content-center" style="width: 24px; height: 24px;">
                            <i class="fas fa-phone text-primary" style="font-size: 0.875rem;"></i>
                          </span>
                          <span class="text-muted small text-truncate">
                          ${list[i].contactPhone}</span>
                        </div>
                      </div>
                    </div>

                    <!-- Contact Details -->
                     <div class="mt-3">
                      <div class="d-flex align-items-center gap-2 mb-2">
                        <span class="badge bg-violet-subtle text-violet rounded-1 p-2 d-flex align-items-center justify-content-center" style="width: 24px; height: 24px;">
                          <i class="fas fa-envelope" style="font-size: 0.875rem;"></i>
                        </span>
                        <span class="text-secondary small text-truncate">
                        ${list[i].contactEmail}</span>
                      </div>
                      <div class="d-flex align-items-center gap-2 mb-2">
                        <span class="badge bg-success-subtle text-success rounded-1 p-2 d-flex align-items-center justify-content-center" style="width: 24px; height: 24px;">
                          <i class="fas fa-map-marker-alt" style="font-size: 0.875rem;"></i>
                        </span>
                        <span class="text-secondary small text-truncate">
                        ${list[i].contactAddress}</span>
                      </div>
                     </div>

                     <!-- Badges -->

                      <div class="d-flex flex-wrap gap-1 mt-3">
                        <span class="badge bg-violet-subtle text-violet fw-medium text-capitalize">
                        ${list[i].contactGroup}</span>
                        ${list[i].isEmergency ? `
                          <span class="badge bg-danger-subtle text-danger fw-medium d-inline-flex align-items-center gap-1 text-capitalize">
                            <i class="fa-solid fa-heart-pulse" style="font-size: 0.875rem;"></i>
                            Emergency
                          </span>
                        ` : ''}
                      </div>
                  </div>
                  <!-- Action Footer -->
                   <div class="card-footer bg-light border-top-0 p-x-3 p-2 d-flex justify-content-between align-items-center">
                     <div class="d-flex gap-1">
                      <a href="tel:01055679585" class="btn btn-sm bg-success-subtle text-success border-0 rounded-2 icon-box-sm" title="Call">
                        <i class="fas fa-phone small"></i>
                      </a>
                      <button class="btn btn-sm bg-violet-subtle text-violet border-0 rounded-2 icon-box-sm" title="Email">
                        <i class="fas fa-envelope small"></i>
                      </button>
                     </div>
                     <div class="d-flex gap-1">
                      <button
                      onclick="toggleFavorite(${i})"
                       class="btn btn-sm text-warning bg-warning-subtle border-0 rounded-2 icon-box-sm" title="Favorite">
                        <i class="fas fa-star small"></i>
                      </button>
                      <button
                      onclick="toggleEmergency(${i})"
                       class="btn btn-sm text-danger bg-danger-subtle border-0 rounded-2 icon-box-sm" title="Emergency">
                        <i class="fa-solid fa-heart-pulse small"></i>
                      </button>
                      <button 
                      onclick="setToUpdate(${i})" data-bs-toggle="modal" data-bs-target="#contactModal"
                      class="btn btn-sm text-secondary border-0 rounded-2 icon-box-sm" title="Edit">
                        <i class="fas fa-pen small"></i>
                      </button>
                      <button 
                      onclick="deleteContact(${i})"
                      class="btn btn-sm text-secondary border-0 rounded-2 icon-box-sm" title="Delete">
                        <i class="fas fa-trash small"></i>
                      </button>
                     </div>
                   </div>
                </div>
              </div>`
    }
    // console.log(contacts);
    allContactsContainer.innerHTML = contentToRender;
    displayCounters();
    displayFeaturedContacts();
}

function clearForm(){
    contactNameInput.value= "",
    contactPhoneInput.value= "",
    contactEmailInput.value= "",
    contactAddressInput.value= "",
    contactGroupInput.value= "",
    contactNotesInput.value= "",
    contactFavoriteInput.checked= false,
    contactEmergencyInput.checked= false,
    //Remove red border lines from inputs
    contactNameInput.classList.remove("is-invalid");
    contactPhoneInput.classList.remove("is-invalid");
    contactEmailInput.classList.remove("is-invalid");

    //  Hide all error message divs
    document.getElementById("contactNameError").classList.add("d-none");
    document.getElementById("contactPhoneError").classList.add("d-none");
    document.getElementById("contactEmailError").classList.add("d-none");

}

function createavatar(name) {
    var contactName = name.trim().split(" ");
    var firstLetter = contactName[0].charAt(0).toUpperCase();
    var lastLetter = contactName.length > 1 ? contactName[contactName.length - 1].charAt(0).toUpperCase() : "";
    return firstLetter + lastLetter;

}

function getCounters(){
    var favoriteContacts=[];
    var emergencyContacts=[];
    var totalContacts = contacts.length;
    for (var i = 0; i < contacts.length; i++) {
        if (contacts[i].isFavorite) {
            favoriteContacts.push(contacts[i]);
        }
        if (contacts[i].isEmergency) {
            emergencyContacts.push(contacts[i]);
        }
    }
    return {
        totalContacts: totalContacts,
        favoriteContacts: favoriteContacts.length,
        emergencyContacts: emergencyContacts.length
    };
 }


function displayCounters(){
    // I didn't use innerHTML because I will not put an element, just a string inside the element, so I used textContent instead of innerHTML.
    // totalCount.textContent = getCounters().totalContacts;
    // favoriteCount.textContent = getCounters().favoriteContacts;
    // emergencyCount.textContent = getCounters().emergencyContacts;
    // other way as one object:
    var{totalContacts:total, favoriteContacts:favorite, emergencyContacts:emergency} = getCounters();
    totalCount.textContent = total;
    favoriteCount.textContent = favorite;
    emergencyCount.textContent = emergency;

}



function displayFeaturedContacts() {
    var favoriteContentToRender = "";
    var emergencyContentToRender = "";

    
    // 1. Reset global arrays
    favoriteContacts = [];
    emergencyContacts = [];

    // 2. Loop through `contacts` to fill the arrays!
    for (var i = 0; i < contacts.length; i++) {
        if (contacts[i].isFavorite) {
            favoriteContacts.push(contacts[i]);
        }
        if (contacts[i].isEmergency) {
            emergencyContacts.push(contacts[i]);
        }
    }

    // 3. Render Favorites
    if (favoriteContacts.length > 0) {
        for (var i = 0; i < favoriteContacts.length; i++) {
            favoriteContentToRender += `<div class="col-12 col-md-6 col-lg-12">
                  <div class="d-flex align-items-center justify-content-between p-2 rounded-3 border border-1 hover-bg-warning min-w-0">
                    <div class="d-flex align-items-center gap-3 min-w-0">
                      <div class="rounded-3  d-flex align-items-center justify-content-center text-center text-white" style="width: 40px; height: 40px; font-size: 0.875rem; min-width: 40px;background-color: ${favoriteContacts[i].avatarBg};">
                        ${createavatar(favoriteContacts[i].contactName)}
                      </div>
                      <div class="min-w-0">
                        <h3 class="h6 mb-0 fw-bold text-dark text-truncate">
                          ${favoriteContacts[i].contactName}
                        </h3>
                        <p class="text-muted small text-truncate mb-0">
                          ${favoriteContacts[i].contactPhone}
                        </p>
                      </div>
                    </div>
                    <span class="badge bg-success-subtle text-success rounded-3 border-0 p-2">
                      <i class="fas fa-phone text-success small"></i>
                    </span>
                  </div>
                </div>`;
        }
    } else {
        // Empty state for Favorites
        favoriteContentToRender = `
        <div class="text-center py-4 text-muted fw-semibold small">
            No favorites yet
        </div>`;
    }

    // 4. Render Emergency
    if (emergencyContacts.length > 0) {
        for (var i = 0; i < emergencyContacts.length; i++) {
            emergencyContentToRender += `<div class="col-12 col-md-6 col-lg-12">
                  <div class="d-flex align-items-center justify-content-between p-2 rounded-3 border border-1 hover-bg-danger min-w-0">
                    <div class="d-flex align-items-center gap-3 min-w-0">
                      <div class="rounded-3  d-flex align-items-center justify-content-center text-center text-white" style="width: 40px; height: 40px; font-size: 0.875rem; min-width: 40px;background-color: ${emergencyContacts[i].avatarBg};">
                        ${createavatar(emergencyContacts[i].contactName)}
                      </div>
                      <div class="min-w-0">
                        <h3 class="h6 mb-0 fw-bold text-dark text-truncate">
                          ${emergencyContacts[i].contactName}
                        </h3>
                        <p class="text-muted small text-truncate mb-0">
                          ${emergencyContacts[i].contactPhone}
                        </p>
                      </div>
                    </div>
                    <span class="badge bg-danger-subtle text-danger rounded-3 border-0 p-2">
                      <i class="fas fa-phone text-danger small"></i>
                    </span>
                  </div>
                </div>`;
        }
    }else {
        // Empty state for Emergency
        emergencyContentToRender = `
        <div class="text-center py-4 text-muted fw-semibold small">
            No emergency contacts
        </div>`;
    }

    // 5. Inject into DOM (appear in yhe HTML)
    EmergencyList.innerHTML = emergencyContentToRender;
    FavoriteList.innerHTML = favoriteContentToRender;
}




function deleteContact(index) {
    Swal.fire({
        title: "Delete Contact?",
        text: `Are you sure you want to delete ${contacts[index].contactName}? This action cannot be undone.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545", 
        cancelButtonColor: "#6c757d",  
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel"
    }).then((result) => {
        // Only delete if the user clicks "Yes, delete it!"
        if (result.isConfirmed) {
            contacts.splice(index, 1);
            localStorage.setItem("contacts", JSON.stringify(contacts));
            displayContacts(contacts);

            Swal.fire({
                icon: "success",
                title: "Contact Deleted!",
                text: "The contact has been successfully deleted.",
                timer: 1500,
                showConfirmButton: false
            });
        }
    });
      
}


function toggleFavorite(index) {
    // Flip the boolean (true becomes false, false becomes true)
    contacts[index].isFavorite = !contacts[index].isFavorite;
    
    // Save updated array to localStorage
    localStorage.setItem("contacts", JSON.stringify(contacts));
    
    // Re-render everything (cards, counters, and sidebar)
    displayContacts(contacts);
}


function toggleEmergency(index) {
    // Flip the boolean
    contacts[index].isEmergency = !contacts[index].isEmergency;
    
    // Save updated array to localStorage
    localStorage.setItem("contacts", JSON.stringify(contacts));
    
    // Re-render everything
    displayContacts(contacts);
}

function setToUpdate(index){
    currentIndex = index; // Store the index of the contact being updated
   
    updateContactBtn.classList.remove("d-none");
    saveContactBtn.classList.add("d-none");

    contactNameInput.value=contacts[index].contactName;
    contactPhoneInput.value=contacts[index].contactPhone;
    contactEmailInput.value=contacts[index].contactEmail;
    contactAddressInput.value=contacts[index].contactAddress;
    contactGroupInput.value=contacts[index].contactGroup;
    contactNotesInput.value=contacts[index].contactNotes;
    contactFavoriteInput.checked=contacts[index].isFavorite;
    contactEmergencyInput.checked=contacts[index].isEmergency;
}

// It is like the addContact
function updateContact(){
    var nameValue = contactNameInput.value.trim();
    var phoneValue = contactPhoneInput.value.trim();

    // 1. Basic empty checks
    if (nameValue === "") {
        Swal.fire({
            icon: "error",
            title: "Missing Name",
            text: "Please enter a name for the contact!"
        });
        return;
    }
    if (phoneValue === "") {
        Swal.fire({
            icon: "error",
            title: "Missing Phone",
            text: "Please enter a phone number!"
        });
        return;
    }

    // 2. Regex (input validation)
    const isNameValid = validateName();
    const isPhoneValid = validatePhone();
    const isEmailValid = validateEmail();

    if (!isNameValid || !isPhoneValid || !isEmailValid) {
        return;
    }
    // 3. CHECK FOR DUPLICATE PHONE NUMBER (Excluding current index)
    var existingContact = contacts.find(function(c, index) {
        return c.contactPhone.trim() === phoneValue && index !== currentIndex;
    });

    if (existingContact) {
        Swal.fire({
            icon: "error",
            title: "Duplicate Phone Number",
            text: `A contact with this phone number already exists: ${existingContact.contactName}`,
            confirmButtonColor: "#7066e0"
        });
        return;
    }
    contacts[currentIndex].contactName = contactNameInput.value;
    contacts[currentIndex].contactPhone = contactPhoneInput.value;
    contacts[currentIndex].contactEmail = contactEmailInput.value;
    contacts[currentIndex].contactAddress = contactAddressInput.value;
    contacts[currentIndex].contactGroup = contactGroupInput.value;
    contacts[currentIndex].contactNotes = contactNotesInput.value;
    contacts[currentIndex].isFavorite = contactFavoriteInput.checked;
    contacts[currentIndex].isEmergency = contactEmergencyInput.checked;

    localStorage.setItem("contacts", JSON.stringify(contacts));
    displayContacts(contacts);
    document.getElementById("cancelModalBtn").click();
  clearForm();
  updateContactBtn.classList.add("d-none");
  saveContactBtn.classList.remove("d-none");
  Swal.fire({
        icon: "success",
        title: "Contact Updated!",
        text: "The contact has been successfully updated.",
        timer: 1500, 
        showConfirmButton: false
    });
 }


searchInput.addEventListener("input", searchContacts);

function searchContacts(){
  var searchTerm = searchInput.value;
  var filteredContacts = [];
    clearTimeout(debounceTimer);
  debounceTimer = setTimeout(function() {
     for (var i = 0; i < contacts.length; i++) {
      var name = String(contacts[i].contactName).toLowerCase();
      var phone = String(contacts[i].contactPhone).toLowerCase();
      var email = String(contacts[i].contactEmail).toLowerCase();
    if (name.includes(searchTerm.toLowerCase().trim()) || phone.includes(searchTerm.toLowerCase().trim()) || email.includes(searchTerm.toLowerCase().trim())) {
      filteredContacts.push(contacts[i]);
    }
  }
   displayContacts(filteredContacts);
  }, 600); 
 
 
}

function validateField(input, regex, errorElement, isRequired = true) {
    const value = input.value.trim();

    // If optional field (like Email) is empty, it's valid
    if (!isRequired && value === "") {
        input.classList.remove("is-invalid");
        errorElement.classList.add("d-none");
        return true;
    }

    // Test input value against regex
    if (regex.test(value)) {
        input.classList.remove("is-invalid");
        errorElement.classList.add("d-none");
        return true;
    } else {
        input.classList.add("is-invalid");
        errorElement.classList.remove("d-none");
        return false;
    }
}
// Individual Validation Functions
function validateName() {
    return validateField(contactNameInput, nameRegex, contactNameError, true);
}

function validatePhone() {
    return validateField(contactPhoneInput, phoneRegex, contactPhoneError, true);
}

function validateEmail() {
    return validateField(contactEmailInput, emailRegex, contactEmailError, false);
}

// Attach real-time validation event listeners
contactNameInput.addEventListener("input", validateName);
contactPhoneInput.addEventListener("input", validatePhone);
contactEmailInput.addEventListener("input", validateEmail);

displayContacts(contacts);
