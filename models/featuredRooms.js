const featuredRooms = {
    roomDB: [],
    init() {
        const roomDB = [];
        this.roomDB.push({
            title:'Pondicherry',
            description:`Puducherry, formerly known as Pondicherry, is one of the 8 union territories of India.`,  
            price:`344.00`,
            duration: `4 Days 3 Nights`,
            expiration:`5 May, 2020`,
            image:`../img/4.jpg`
        });
        this.roomDB.push({
            title:'Pondicherry',
            description:`Puducherry, formerly known as Pondicherry, is one of the 8 union territories of India.`,  
            price:`344.00`,
            duration: `4 Days 3 Nights`,
            expiration:`5 May, 2020`,
            image:`../img/4.jpg`
        });
        this.roomDB.push({
            title:'Pondicherry',
            description:`Puducherry, formerly known as Pondicherry, is one of the 8 union territories of India.`,  
            price:`344.00`,
            duration: `4 Days 3 Nights`,
            expiration:`5 May, 2020`,
            image:`../img/4.jpg`
        });
        this.roomDB.push({
            title:'Pondicherry',
            description:`Puducherry, formerly known as Pondicherry, is one of the 8 union territories of India.`,  
            price:`344.00`,
            duration: `4 Days 3 Nights`,
            expiration:`5 May, 2020`,
            image:`../img/4.jpg`
        });
        this.roomDB.push({
            title:'Pondicherry',
            description:`Puducherry, formerly known as Pondicherry, is one of the 8 union territories of India.`,  
            price:`344.00`,
            duration: `4 Days 3 Nights`,
            expiration:`5 May, 2020`,
            image:`../img/4.jpg`
        });
        this.roomDB.push({
            title:'Pondicherry',
            description:`Puducherry, formerly known as Pondicherry, is one of the 8 union territories of India.`,  
            price:`344.00`,
            duration: `4 Days 3 Nights`,
            expiration:`5 May, 2020`,
            image:`../img/4.jpg`
        });
    },
    getAllllFeaturedRooms() {
        return this.roomDB;
    }
}

featuredRooms.init();
module.exports = featuredRooms;