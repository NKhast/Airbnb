const promotion =
{

    fakeDB : [],

    init()
    {

        this.fakeDB.push({
            title:'Pondicherry',
            description:`Puducherry, formerly known as Pondicherry, is one of the 8 union territories of India.`,  
            price:`344.00`,
            duration: `4 Days 3 Nights`,
            expiration:`5 May, 2020`,
            image:`../img/1.jpg`
        });
    
        this.fakeDB.push({
            title:'Pondicherry',
            description:`Puducherry, formerly known as Pondicherry, is one of the 8 union territories of India.`,  
            price:`344.00`,
            duration: `4 Days 3 Nights`,
            expiration:`5 May, 2020`,
            image:`../img/8.jpg`
        });
    
        this. fakeDB.push({
            title:'Pondicherry',
            description:`Puducherry, formerly known as Pondicherry, is one of the 8 union territories of India.`,  
            price:`344.00`,
            duration: `4 Days 3 Nights`,
            expiration:`5 May, 2020`,
            image:`../img/9.jpg`
        });


        this. fakeDB.push({
            title:'Pondicherry',
            description:`Puducherry, formerly known as Pondicherry, is one of the 8 union territories of India.`,  
            price:`344.00`,
            duration: `4 Days 3 Nights`,
            expiration:`5 May, 2020`,
            image:`../img/4.jpg`
        });
    },
    getallPromotions()
    {
        return this.fakeDB;
    }

}


promotion.init();
module.exports=promotion;