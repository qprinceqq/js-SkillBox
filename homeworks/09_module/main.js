(function (){
    function pushToStorage(listName, list) {
        localStorage.setItem(listName, JSON.stringify(list))
    }

    function getFromStorage(listName) {
        let storage = JSON.parse(localStorage.getItem(listName))
        if (!storage) {storage = []}
        return storage
    }

    function createCardNCondition(cardName, index){
        let card = document.createElement("button");
        card.setAttribute("style", "width:25%; height:200px");
        card.setAttribute("id", index);
        card.classList.add("btn-light");
        card.textContent = "Перевернуть!";

        card.addEventListener("click", function(){
            let key = getFromStorage('key')
            card.textContent = cardName;

            if (tryCards.length == 2) tryCards.splice(0, 1);
            tryCards.push({
                id : index,
                name : cardName
            });
            
            // если карты совпали
            if (tryCards.length === 2 && tryCards[0].name === tryCards[1].name && tryCards[0].id !== tryCards[1].id){
                let card1 = document.getElementById(tryCards[0].id);
                let card2 = document.getElementById(tryCards[1].id);
                card1.setAttribute("disabled", true);
                card2.setAttribute("disabled", true);
                key += 1;
                pushToStorage('key', key);

                // конец игры
                if (key.length === 8) {
                    let reButton = document.createElement("button");
                    reButton.textContent = "СЫГРАТЬ ЕЩЕ РАЗ";
                    reButton.classList.add("btn-info","btn-lg");
                    reButton.addEventListener("click", function() {
                        location.reload();
                    })
                    let main = document.getElementById("main-div");
                    main.append(reButton);
                }
            }
            setTimeout(function(){
                if (!card.getAttribute("disabled")){
                    card.textContent = "Перевернуть!";
                }
            }, 1234)
        });
        return card;
    }

    function createCardsApp(){
        pushToStorage('key', 0);
        let shuffleCardList = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8].sort(() => Math.random() - 0.5);
        let main = document.getElementById("main-div");
        for (i in shuffleCardList){
            main.append(createCardNCondition(shuffleCardList[i], i));
        }
    }
    let tryCards = [];
    window.createCardsApp = createCardsApp;
})();