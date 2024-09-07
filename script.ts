// Listing element
document.getElementById('resumeForm')?.addEventListener('submit', function (event) {
    event.preventDefault();

    //type assertion
    const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement;

    const nameElement = document.getElementById('name') as HTMLInputElement;
    const emailElement = document.getElementById('email') as HTMLInputElement;
    const phoneElement = document.getElementById('phone') as HTMLInputElement;
    const addressElement = document.getElementById('address') as HTMLInputElement;
    const educationElement = document.getElementById('education') as HTMLInputElement;
    const experienceElement = document.getElementById('experience') as HTMLInputElement;
    const skillsElement = document.getElementById('skills') as HTMLInputElement;

    if (profilePictureInput && nameElement && emailElement && phoneElement && addressElement && educationElement && experienceElement && skillsElement) {

        const name = nameElement.value;
        const email = emailElement.value;
        const phone = phoneElement.value;
        const address = addressElement.value;
        const education = educationElement.value;
        const experience = experienceElement.value;
        const skills = skillsElement.value;

        // create picture element
        const profilePicture = profilePictureInput.files?.[0]
        const profilePictureURL = profilePicture ? URL.createObjectURL(profilePicture) : "";

        //create resume output 
        const resumeOutput = `
    <h1>Resume</h1>
    ${profilePicture ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profilePicture">` : ''}
    <p><strong>Name:</strong><span id="edit-name" class="editable"> ${name} </span> </p>
    <p><strong>Email:</strong><span id="edit-email" class="editable"> ${email} </span> </p>
    <p><strong>Phone: </strong><span id="edit-phone" class="editable"> ${phone} </span> </p>
    <p><strong>Address: </strong><span id="edit-address" class="editable"> ${address} </span> </p>
  
    <h3>Education</h3>
    <p id="edit-education" class="editable">${education}</p>


    <h3>Experience</h3>
    <p id="edit-experience" class="editable">${experience}</p>

    <h3>Skills</h3>
    <p id="edit-skills" class="editable">${skills}</p>
    `;


        //add resume output to resume output element

        const resumeOutputElement = document.getElementById('resumeOutput');
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput;
            makeEditable();
        } else {
            console.error('Some element are not found')
        }

    }
});

function makeEditable() {
    const editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(element => {
        element.addEventListener('click', function () {
            const currentElement = element as HTMLElement;
            const currentValue = currentElement.textContent || "";

            //replace the text content with an input field
            if (currentElement.tagName === 'p' || currentElement.tagName === 'span') {
                const input = document.createElement('input')
                input.type = 'text';
                input.value = currentValue;
                input.classList.add('editing input')

                input.addEventListener('blur', function () {
                    currentElement.textContent = input.value;
                    currentElement.style.display = 'inline';
                    input.remove();
                })


                currentElement.style.display = 'none';
                currentElement.parentNode?.insertBefore(input, currentElement)
                input.focus()

            }
        })
    })
}
