(function (){
    function shuffleList(list) {
        list.sort(() => Math.random() - 0.5);
        return list;
    }

    function createCard(cardName, index){
        let card = document.createElement("button");
        card.textContent = "Перевернуть!";
        card.classList.add("btn-light");
        card.setAttribute("style", "width:25%; height:200px");
        card.setAttribute("id", index);

        card.addEventListener("click", function(){
            tryCards.push({
                id : index,
                name : cardName
            });
            if (tryCards.length === 3) tryCards.splice(0, 1);
            card.textContent = cardName;
            if (tryCards.length === 2 && tryCards[0].name === tryCards[1].name && tryCards[0].id !== tryCards[1].id){
                let card1 = document.getElementById(tryCards[0].id);
                let card2 = document.getElementById(tryCards[1].id);
                if (disableCount === 8) {
                    let reButton = document.createElement("button");
                    reButton.classList.add("btn-outline-primary","btn-block","active");
                    reButton.setAttribute("style", "height:150px");
                    reButton.innerHTML = "<strong>СЫГРАТЬ ЕЩЕ РАЗ</strong>";
                    reButton.addEventListener("click", function(){
                        location.reload();
                    })
                    document.body.append(reButton)
                }
                if (!card1.getAttribute("disabled") && !card2.getAttribute("disabled")){
                    card1.setAttribute("disabled", true);
                    card2.setAttribute("disabled", true);
                    disableCount = disableCount + 1
                }   
            }
            setTimeout(function(){
                if (!card.getAttribute("disabled")){
                    tryCards.splice(0, 1)
                    card.textContent = "Перевернуть!";
                }
            },1000);
        });
        return card;
    }

    function createCardsApp(){
        let cardList = shuffleList([1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8]);
        for (i in cardList){
            document.body.append(createCard(cardList[i], i));
        }
    }

    let disableCount = 1
    let tryCards = [];
    window.createCardsApp = createCardsApp;
})();