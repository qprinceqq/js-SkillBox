// Напишите функцию filter(), которая создаёт массив email-адресов, не попавших в чёрный список.

function filter(white_list, black_list){
    return white_list.filter((item) => !black_list.includes(item))
}


let white_list = ['my-email@gmail.ru', 'jsfunc@mail.ru', 'annavkmail@vk.ru', 'fullname@skill.ru', 'goodday@day.ru']
let black_list = ['jsfunc@mail.ru', 'goodday@day.ru']
console.log(filter(white_list, black_list))
