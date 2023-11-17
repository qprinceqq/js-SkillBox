// Напишите функцию filter(), которая создаёт массив email-адресов, не попавших в чёрный список.

function filter(white_list, black_list){
    let filtered_list = []
    for (let i of white_list){
        if (!black_list.includes(i)){
            filtered_list.push(i)
        }
    }
    return filtered_list
}


let white_list = ['my-email@gmail.ru', 'jsfunc@mail.ru', 'annavkmail@vk.ru', 'fullname@skill.ru', 'goodday@day.ru']
let black_list = ['jsfunc@mail.ru', 'goodday@day.ru']
console.log(filter(white_list, black_list))
