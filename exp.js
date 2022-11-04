const my_form = document.getElementById('form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const amountInput = document.getElementById('amount');
const optionInput = document.getElementById('options');
const descriptionInput = document.getElementById('des');
const userList = document.getElementById('itemList');

my_form.addEventListener('submit', onsubmit)

async function onsubmit(e) {
    e.preventDefault();
    const name = nameInput.value;
    const emailId = emailInput.value;
    const catogory = optionInput.value;
    const amount = amountInput.value;
    const description = descriptionInput.value;


    usersDetails = {
        name: name,
        emailId: emailId,
        catogory: catogory,
        amount: amount,
        description: description
    }
    try {
        const response = await axios.post("https://crudcrud.com/api/eddb2e78ae4f4a5f8ad2cc580a5b1eaa/usersDetails", usersDetails)

        const data = await showOnScreen(response.data)

    }
    catch (error) {
        console.log(error)

    }
}

async function event() {

    try {
        const response = await axios.get("https://crudcrud.com/api/eddb2e78ae4f4a5f8ad2cc580a5b1eaa/usersDetails")

        for (let i = 0; i < response.data.length; i++) {

            const data = await showOnScreen(response.data[i])
        }

    }
    catch (err) {
        console.log(err)
    }

}



function showOnScreen(user) {

    nameInput.value = '';
    emailInput.value = '';
    optionInput.value = '';
    amountInput.value = '';
    descriptionInput.value = '';


    const parentNode = document.getElementById('itemList');
    const childHtml = `<li id = ${user._id}> ${user.name} :- ${user.emailId} ,${user.catogory} : ${user.amount} , ${user.description}
                                
                     <button onclick = editUser('${user.name}','${user.emailId}','${user.amount}','${user._id}')> Edit </button> 
                    
                     <button onclick = deleteUser('${user._id}')> Delete </button>
    
                       </li>`

    parentNode.innerHTML = parentNode.innerHTML + childHtml


}
// Edit user
function editUser(name, email, amount, userId) {

    nameInput.value = name;
    emailInput.value = email;
    amountInput.value = amount;
    // descriptionInput.value = description;

    deleteUser(userId)

}

// delete user
async function deleteUser(userId) {
    try {
        const response = await axios.delete(`https://crudcrud.com/api/eddb2e78ae4f4a5f8ad2cc580a5b1eaa/usersDetails/${userId}`)

        const data = await removeFromScreen(userId)

    }
    catch (err) {
        console.log(err)
    }
}

// remove from the screen

function removeFromScreen(userId) {
    const parentNode = document.getElementById('itemList');
    const childNode = document.getElementById(userId);

    if (childNode) {
        parentNode.removeChild(childNode)
    }
}