function filter(whiteList, blackList){
    let filteredList = []
    for (let i of whiteList){
        if (!blackList.includes(i)){
            filteredList.push(i)
        }
    }
    return filteredList
}


function Main() {
    let whiteList = ['my-email@gmail.ru', 'jsfunc@mail.ru', 'annavkmail@vk.ru', 'fullname@skill.ru', 'goodday@day.ru']
    let blackList = ['jsfunc@mail.ru', 'goodday@day.ru']
    console.log(filter(whiteList, blackList))
}

Main()