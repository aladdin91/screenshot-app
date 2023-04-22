console.log('working')
const BASE_URL = 'https://crudcrud.com/api/'
const userInput = document.querySelector('#userInput');
const getBtn = document.querySelector('#getBtn');
const saveBtn = document.querySelector('#saveBtn');
const imgContainer = document.querySelector('#imgContainer');
const showBtn = document.querySelector('#showBtn');
const savedImgs = document.querySelector('#savedImgs');
let screenshotURL
const getScreenshotURL = async() => {
    if (userInput.value === '') {
        alert('Please enter url')
    } else {
        imgContainer.innerHTML = `<p>loading...</p>`
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '6b3bd4d060msh0c81c1bdce3f637p1deb63jsn46db5f691b5b',
                'X-RapidAPI-Host': 'website-screenshot6.p.rapidapi.com'
            }
        };
        try {
            const response = await fetch(`https://website-screenshot6.p.rapidapi.com/screenshot?url=${userInput.value}%2F&width=1920&height=1080&fullscreen=true`, options)
            const resURL = await response.json()
            imgContainer.innerHTML = `<img class="get_img" src="${resURL.screenshotUrl}" alt="">`
            screenshotURL = resURL.screenshotUrl
            console.log(screenshotURL)
        } catch (error) {
            alert('something went wrong, please try agin later')
            console.log(error)
        }
    }
}
const showScreenshotList = (screenshotURL) => {
    return `
            <div>
              <img class="save_img" src="${screenshotURL.imageUrl}" alt="">
              <button onclick="screenshotDelete('${screenshotURL._id}')" class="deleteBtn">X</button>
            </div>
            `
}
const saveScreenshot = async() => {
    if (screenshotURL === undefined) {
        alert('Please enter a url')
    } else {
        const body = {
            imageUrl: screenshotURL,
        }
        try {
            const response = await fetch(`${BASE_URL}${API_KEY}/blog`, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            if (response.status === 201) {
                alert('imge saved you can click show saved screenshot button to show it')
            }
        } catch (error) {
            alert('something went wrong, please try agin later')
            console.log(error)
        }
    }
}
const showScreenshot = async() => {
    savedImgs.innerHTML = ''
    try {
        const response = await fetch(`${BASE_URL}${API_KEY}/blog`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        if (data.length <= 0) {
            alert('nothing saved yet')
        } else {
            // console.log(data)
            data.forEach(url => {
                savedImgs.innerHTML += showScreenshotList(url)
            })
        }
        screenshotURL = data
    } catch (error) {
        alert('something went wrong, please try agin later')
        console.log(error)
    }
}

const screenshotDelete = async(screenshotId) => {
    try {
        const response = await fetch(`${BASE_URL}${API_KEY}/blog/${screenshotId}`, {
            method: 'DELETE',
        })
        screenshotURL = screenshotURL.filter((deleteScreenshot) => {
            if (deleteScreenshot._id !== screenshotId) {
                return screenshotURL
            }
        })
        savedImgs.innerHTML = ""
        screenshotURL.forEach((screenshot) => {
            savedImgs.innerHTML += showScreenshotList(screenshot)
        })

    } catch (error) {
        alert('something went wrong, please try agin later')
        console.log(error)
    }
}
getBtn.addEventListener('click', getScreenshotURL)
saveBtn.addEventListener('click', saveScreenshot)
showBtn.addEventListener('click', showScreenshot)