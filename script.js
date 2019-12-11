const apiUrlQuestion = 'https://www.forverkliga.se/JavaScript/api/crud.php?requestKey';
			//const UrlNoKey = 'https://www.forverkliga.se/JavaScript/api/crud.php';
let theKey = '';
const baseUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php?key=';

			//const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; */

	/*------------------------------------------------------------------Window Load and ApiKey*/
    window.addEventListener('load', () => {
		console.log('Window load')
	
        const getAPIKey = document.querySelector('#apiKey');
        getAPIKey.addEventListener('click', async e => {
            
            const response = await fetch(apiUrlQuestion);
            console.log(response);
            
            const respData = await response.json();
			console.log('JSON data: ', respData);

			let apiStatusUl = document.querySelector('#apiResponse');
			apiStatusUl.innerHTML = ''; //Rensa
			if (respData.status == 'success') {
				let respDataKey = respData.key; 
			
				console.log(respDataKey);
				
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
			}//else
			/*
			if (respData.status = 'success') {
            let respDataKey = respData.key; 
			
			console.log(respDataKey);
			
			let display = document.querySelector('#loginInput');
			display.value = respData.key;
		}
		else {
			console.log('Error');
		} */
		}); //Get Key

/*------------------------------------------------------------------------Login and key*/
loginText
		let loginUser = document.querySelector('#loginText')
		let displayInput = document.querySelector('#loginInput');
		let scart = document.querySelector('#loginBtn');
		scart.addEventListener('click', async e => {
			
		  theKey = displayInput.value;
		  loginUser.innerText = theKey;
		  displayInput.value = ''; //Rensa
		  
		  console.log('You entered : ', theKey);
		 // displayInput.value = "";
		// End of scart addEvenlistener function in bottom of document
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
            console.log(response);
			const respData = await response.json();
			console.log('JSON data: ', respData);

			if (respData.status == 'success') {
				titleAdd.value = ''; //Rensa
				authorAdd.value = ''; //Rensa
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

/*------------------------------------------------------------------------Delete Book*/
	/*	const deleteBook = document.querySelector('#deleteBookButton');
        deleteBook.addEventListener('click', async e => {
			let titleDeleteId  = document.querySelector('#idInput');
			let apiStatusUl = document.querySelector('#apiResponse');
			apiStatusUl.innerHTML = ''; //Rensa
		const urlDeleteBook = `${baseUrl}${theKey}&op=delete&id=${titleDeleteId.value}`;
		
		let counter = 1;
		for (let i = 0; i < 5; i++) {
		const response = await fetch(urlDeleteBook);
            console.log(response);
			const respData = await response.json();
			console.log('JSON data: ', respData);

			if (respData.status == 'success') {
				let successMessage = document.createElement('li');
				successMessage.innerHTML = '<strong>' + 'Attempt Nr: ' + counter + '</strong>' + '<br>' + 'Status: ' + respData.status + '<br>' + 
				'Message: Your request succeded' ;
				apiStatusUl.appendChild(successMessage);
				break;
			} else {
				let errorMessage = document.createElement('li');
				errorMessage.innerHTML = '<strong>' + 'Attempt Nr: ' + counter + '</strong>' + 'Status: ' + respData.status + '<br>' + 
				'Message: ' + respData.message ;
				apiStatusUl.appendChild(errorMessage);
			}//else
			counter++;
		}//for
		});
		*/

/*------------------------------------------------------------------------View Book*/
		const viewBook = document.querySelector('#showCards');
        viewBook.addEventListener('click', async e => {
		let apiStatusUl = document.querySelector('#apiResponse');
		apiStatusUl.innerHTML = ''; //Rensa
		
		const urlAddViewBook = `${baseUrl}${theKey}&op=select`;
		
		let counter = 1;
		for (let i = 0; i < 5; i++) {
		const response = await fetch(urlAddViewBook);
            console.log(response);
            const respData = await response.json();
			console.log('JSON data: ', respData);
			
			if (respData.status == 'success') {
				let successMessage = document.createElement('li');
				successMessage.innerHTML = '<strong>' + 'Attempt Nr: ' + counter + '</strong>' + '<br>' + 'Status: ' + respData.status + '<br>' + 
				'Message: Your request succeded' ;
				apiStatusUl.appendChild(successMessage);
			
			let dataObj = respData.data;
			console.log('Här är dataobjektet ' + dataObj);
			console.log('Här är dataobjektets längd ' + dataObj.length);
			
			let bookCards = document.querySelector('.bookCards');
			bookCards.innerHTML = '';  // clear the container
			// Optional: use higher-order functions instead of normal for loop (forEach or map)
			for (let i=0; i<dataObj.length; i++) {
		
				//Skapar container till varge objekt
				let card = document.createElement('div');
				card.classList.add('card');
				bookCards.appendChild(card);
				// card.className = 'card';  <- gör samma sak som classList men med mindre precision

					
								//Skapar title till varge objekt
				let deleteButton = document.createElement('button');
				deleteButton.classList.add('deleteBtn');
				deleteButton.value = `${dataObj[i].id}`
				deleteButton.innerText = 'X';
				
				//deleteButton.addEventListener = ('click', () => {
				deleteButton.addEventListener('click', async e => {
					apiStatusUl.innerHTML = ''; //Rensa
					let urlDeleteBook = `${baseUrl}${theKey}&op=delete&id=${deleteButton.value}`

					let counter = 1;
					for (let i = 0; i < 5; i++) {
					const response = await fetch(urlDeleteBook);
						console.log(response);
						const respData = await response.json();
						console.log('JSON data: ', respData);
							
						if (respData.status == 'success') {
							let successMessage = document.createElement('li');
							successMessage.innerHTML = '<strong>' + 'Attempt Nr: ' + counter + '</strong>' + '<br>' + 'Status: ' + respData.status + '<br>' + 
							'Message: Your request succeded' ;
							apiStatusUl.appendChild(successMessage);
											break;
						} else {
							let errorMessage = document.createElement('li');
							errorMessage.innerHTML = '<strong>' + 'Attempt Nr: ' + counter + '</strong>' + 'Status: ' + respData.status + '<br>' + 
							'Message: ' + respData.message ;
							apiStatusUl.appendChild(errorMessage);
						}//else
						counter++;
					}//for
				});
				card.appendChild(deleteButton);			
								
		
				//Skapar title till varge objekt
				let bookId = document.createElement('div');
				bookId.classList.add('title');
				bookId.innerText = 'Book-ID:' + dataObj[i].id;
				card.appendChild(bookId);
		
				//Skapar lista med egenskaper
				let bookProp = document.createElement('ul');
				bookProp.classList.add('info');
				bookProp.innerHTML = 
				'<li>' + 'Title:  ' + '<span id="spanTitle" contenteditable="true">' + dataObj[i].title + '</span>' + '</li>' + 
				'<li>' + 'Author:  ' + '<span id="spanAuthor" contenteditable="true">' + dataObj[i].author + '</span>' + '</li>' + 
				'<li>' + 'Updated:  '+ dataObj[i].updated + '</li>' ;
		
				bookId.appendChild(bookProp);
			}//For-loop 

			break;

			} else {
				let errorMessage = document.createElement('li');
				errorMessage.innerHTML = '<strong>' + 'Attempt Nr: ' + counter + '</strong>' + '<br>' + 'Status: ' + respData.status + '<br>' + 
				'Message: ' + respData.message ;
				apiStatusUl.appendChild(errorMessage);
			}//else

			counter++;
		
		}//for
		});//ViewBook
	
	

	});//WindowLoad


	