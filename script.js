const apiUrlQuestion = 'https://www.forverkliga.se/JavaScript/api/crud.php?requestKey';
let theKey = '';
const baseUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php?key=';


	/*------------------------------------------------------------------Window Load and ApiKey*/
window.addEventListener('load', () => {
	console.log('Window load')
	
    const getAPIKey = document.querySelector('#apiKey');
    getAPIKey.addEventListener('click', async e => {
            
    const response = await fetch(apiUrlQuestion);
    const respData = await response.json();

	let apiStatusUl = document.querySelector('#apiResponse');
	apiStatusUl.innerHTML = ''; //Rensa
	if (respData.status == 'success') {
			
		let display = document.querySelector('#loginInput');
		display.value = respData.key;

		let successMessage = document.createElement('li');
		successMessage.innerHTML = 'Keyrequest status: ' + respData.status + '<br>' + 
		'Message: Click on the login-button to use the key';
		apiStatusUl.appendChild(successMessage);
		} else {
			let errorMessage = document.createElement('li');
			errorMessage.innerHTML =  'Keyrequest status: ' + respData.status + '<br>' + 
			'Message: Click on the Get api key to get a new key';
			apiStatusUl.appendChild(errorMessage);
		};//else
		
}); //Get Key

/*------------------------------------------------------------------------Login and key*/

let loginUser = document.querySelector('#loginText')
let displayInput = document.querySelector('#loginInput');
let scart = document.querySelector('#loginBtn');
scart.addEventListener('click', async e => {
	theKey = displayInput.value;
	loginUser.innerText = theKey;
	displayInput.value = ''; //Clear
	let apiStatusUl = document.querySelector('#apiResponse');
	apiStatusUl.innerHTML = ''; //Clear

	if (loginUser.innerText == '') {
		let errorMessage = document.createElement('li');
		errorMessage.innerHTML = 'Status: error' + '<br>' + 
		'Message: No key, request a key or input a key in the Login key-field ';
		apiStatusUl.appendChild(errorMessage);
	} else {
		let keyOk = document.createElement('li');
		keyOk.innerHTML = 'Status: success: ' + '<br>' + 
		'Message: You are using Key: ' + theKey;
		apiStatusUl.appendChild(keyOk);
	}
});
/*------------------------------------------------------------------------CreateBook with inputfields*/
const createBook = document.querySelector('#createBookButton');
createBook.addEventListener('click', async e => {
let titleAdd  = document.querySelector('#titleInput');
	let authorAdd = document.querySelector('#authorInput');
	let apiStatusUl = document.querySelector('#apiResponse');
	apiStatusUl.innerHTML = ''; //Rensa
	const urlAddBook = `${baseUrl}${theKey}&op=insert&title=${titleAdd.value}&author=${authorAdd.value}`;
	let counter = 1;
	for (let i = 0; i < 5; i++) {
		const response = await fetch(urlAddBook);
		const respData = await response.json();

		if (respData.status == 'success') {
			titleAdd.value = ''; //Clear if createbook succeded
			authorAdd.value = ''; //Clear if createbook succeded
			let successMessage = document.createElement('li');
			successMessage.innerHTML = '<strong>' + 'Attempt Nr: ' + counter + '</strong>' + '<br>' + 'Status: ' + respData.status + '<br>' + 
			'Message: Your request succeded' ;
			apiStatusUl.appendChild(successMessage);
			break;
			} else {
				let errorMessage = document.createElement('li');
				errorMessage.innerHTML = '<strong>' + 'Attempt Nr: ' + counter + '</strong>' + '<br>' + 'Status: ' + respData.status + '<br>' + 
				'Message: ' + respData.message ;
				apiStatusUl.appendChild(errorMessage);
			}//else
				counter++;
	}//for
});


/*------------------------------------------------------------------------View Book*/
const viewBook = document.querySelector('#showCards');
viewBook.addEventListener('click', async e => {
	let apiStatusUl = document.querySelector('#apiResponse');
	apiStatusUl.innerHTML = ''; //Clear
	const urlAddViewBook = `${baseUrl}${theKey}&op=select`;
	let counter = 1;

	for (let i = 0; i < 5; i++) {
		const response = await fetch(urlAddViewBook);
        const respData = await response.json();
			
	if (respData.status == 'success') {
		let successMessage = document.createElement('li');
		successMessage.innerHTML = '<strong>' + 'Attempt Nr: ' + counter + '</strong>' + '<br>' + 'Status: ' + respData.status + '<br>' + 
		'Message: Your request succeded' ;
		apiStatusUl.appendChild(successMessage);
		let dataObj = respData.data;
		let bookCards = document.querySelector('.bookCards');
		bookCards.innerHTML = '';//Clear
		
		for (let i=0; i<dataObj.length; i++) {
			//Create card-container to every bookelement
			let card = document.createElement('div');
			card.classList.add('card');
			bookCards.appendChild(card);

			//Create a divcontainer inside card to every book
			let bookId = document.createElement('div');
			bookId.classList.add('title');
			//bookId.innerText = 'Book-ID:' + dataObj[i].id;
			card.appendChild(bookId);
		
			//Create ul to every book
			let bookProp = document.createElement('ul');
			bookProp.classList.add('info');
			bookId.appendChild(bookProp);
				
			// Title elements - Create listelement and editable spanelement with unique classname for every spanelement
			let titleProp = document.createElement('li');
			titleProp.classList.add('titleInfo')
			titleProp.innerHTML = 'Title:  ';
			bookProp.appendChild(titleProp);
				
			let idForModTitle = dataObj[i].id;
			let titleSpan = document.createElement('span');
			titleSpan.classList.add(idForModTitle + 'title'); //unique classname
			titleSpan.innerHTML = dataObj[i].title;
			titleSpan.contentEditable = "true";
			titleProp.appendChild(titleSpan); 

			// Author elements - Create listelement and editable spanelement with unique classname for every spanelement
			let authorProp = document.createElement('li');
			authorProp.classList.add('authorInfo')
			authorProp.innerHTML = 'Author:  ';
			bookProp.appendChild(authorProp);

			let idForModAuthor = dataObj[i].id;
			let authorSpan = document.createElement('span');
			authorSpan.classList.add(idForModAuthor + 'author'); //unique classname
			authorSpan.innerHTML = dataObj[i].author;
			authorSpan.contentEditable = "true";
			authorProp.appendChild(authorSpan); 

			//Update 
			let updatedProp = document.createElement('li');
			updatedProp.classList.add('updatedInfo')
			updatedProp.innerHTML = 'Updated: ' + dataObj[i].updated;
			bookProp.appendChild(updatedProp);

			//Deletebutton
			let deleteButton = document.createElement('button');
			deleteButton.classList.add('deleteBtn');
			deleteButton.value = `${dataObj[i].id}`
			deleteButton.innerText = 'Delete Book';
				
			deleteButton.addEventListener('click', async e => {
				apiStatusUl.innerHTML = ''; //Clear
				let urlDeleteBook = `${baseUrl}${theKey}&op=delete&id=${deleteButton.value}`

				let counter = 1;
				for (let i = 0; i < 5; i++) {
					const response = await fetch(urlDeleteBook);
					const respData = await response.json();
	
					if (respData.status == 'success') {
						deleteButton.innerText = 'Book Deleted';
						deleteButton.disabled = true;
						deleteButton.classList.add('deleteBtnDeleted')
						let successMessage = document.createElement('li');
						successMessage.innerHTML = '<strong>' + 'Attempt Nr: ' + counter + '</strong>' + '<br>' + 'Status: ' + respData.status + '<br>' + 
						'Message: Your request succeded' ;
						apiStatusUl.appendChild(successMessage);
						
						break;
						} else {
							let errorMessage = document.createElement('li');
							errorMessage.innerHTML = '<strong>' + 'Attempt Nr: ' + counter + '</strong>' + '<br>' + 'Status: ' + respData.status + '<br>' + 
							'Message: ' + respData.message ;
							apiStatusUl.appendChild(errorMessage);
						}//else
							counter++;
				}//for
			});//Deletebutton
				card.appendChild(deleteButton);
				
				//Modify book object
				let modifyButton = document.createElement('button');
				modifyButton.innerText = 'Apply Change';
				modifyButton.classList.add('modifyBtn');
				let buttonValueId = dataObj[i].id;
				modifyButton.value = buttonValueId;
				let titleMod = document.querySelector(`.${CSS.escape(buttonValueId)}title`); //Inserting variable inside queryselector parentheses
				let authorMod = document.querySelector(`.${CSS.escape(buttonValueId)}author`); //Inserting variable inside queryselector parentheses
				card.appendChild(modifyButton);

				titleMod.addEventListener('click', async e => {
					modifyButton.classList.remove('btnModified')
					modifyButton.innerText = 'Apply Change';
				})

				authorMod.addEventListener('click', async e => {
					modifyButton.classList.remove('btnModified')
					modifyButton.innerText = 'Apply Change';
				})
				
				modifyButton.addEventListener('click', async e => {
					apiStatusUl.innerHTML = ''; //Clear
					let urlmodifyButton = `${baseUrl}${theKey}&op=update&id=${buttonValueId}&title=${titleMod.innerHTML}&author=${authorMod.innerHTML}`;
					
					let counter = 1;
					for (let i = 0; i < 5; i++) {
						const response = await fetch(urlmodifyButton);
						const respData = await response.json();
							
						if (respData.status == 'success') {
							let successMessage = document.createElement('li');
							modifyButton.classList.add('btnModified')
							modifyButton.innerText = 'Book Modified';
							successMessage.innerHTML = '<strong>' + 'Attempt Nr: ' + counter + '</strong>' + '<br>' + 'Status: ' + respData.status + '<br>' + 
							'Message: Your request succeded' ;
							apiStatusUl.appendChild(successMessage);
							break;
							} else {
								let errorMessage = document.createElement('li');
								errorMessage.innerHTML = '<strong>' + 'Attempt Nr: ' + counter + '</strong>' + '<br>' + 'Status: ' + respData.status + '<br>' + 
								'Message: ' + respData.message ;
								apiStatusUl.appendChild(errorMessage);
							}//else
								counter++;
					};//for
				});//Modify Button
					card.appendChild(modifyButton);

		};//For-loop 

			break;

	} else { //ViewBook
		let errorMessage = document.createElement('li');
		errorMessage.innerHTML = '<strong>' + 'Attempt Nr: ' + counter + '</strong>' + '<br>' + 'Status: ' + respData.status + '<br>' + 
		'Message: ' + respData.message ;
		apiStatusUl.appendChild(errorMessage);
	}//else

		counter++;
		
	};//for

});//ViewBook


});//WindowLoad


	