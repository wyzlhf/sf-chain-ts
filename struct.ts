// data应该是Transaction的array
export const data=[
    // 第一个Transaction
    {
        id:'111111111111',
        input:{
            timestamp:123456,
            amount:2,
            address:'111111',
            signature: {
                r:'rrrrr',
                s:'sssssssss',
                recooveryParam:1
            },
        },
        outputs:[
            {
                amount:1,
                address:'aaaaaaa',
            },
            {
                amount:2,
                address:'bbbbbbb',
            },
        ]
    },
    // 第二个Transaction
    {
        id:'22222222222222222',
        input:{
            timestamp:123456,
            amount:2,
            address:'111111',
            signature: {
                r:'rrrrr',
                s:'sssssssss',
                recooveryParam:1
            },
        },
        outputs:[
            {
                amount:1,
                address:'aaaaaaa',
            },
            {
                amount:2,
                address:'bbbbbbb',
            },
        ]
    }
]