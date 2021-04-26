
// Get categories from products
export const getCategories = (products) => {
    var categories = [];
    var i=0;
    while(i<products.length){
        categories.push(products[i].category);
        i++;
    }
    let uniqueChars = categories.filter((c, index) => {
        return categories.indexOf(c) === index;
    });
    return uniqueChars;
}

// Get stores from products
export const getStores = (products) => {
    var stores = [];
    var i=0;
    while(i<products.products.length){
        stores.push(products.storenames[i]);
        i++;
    }
    let uniqueChars = stores.filter((c, index) => {
        return stores.indexOf(c) === index;
    });
    return uniqueChars
}

// Get Minimum and Maximum Prices from Json Data
export const getMinMaxPrice = (products) => {
    let min = 1000, max = 0;

    products.map((product, index) => {
        min = (product.price-(product.price*product.discount/100) < min) ? (product.price-(product.price*product.discount/100)) : min;
        max = (product.price-(product.price*product.discount/100) > max) ? (product.price-(product.price*product.discount/100)) : max;
    })

    return {'min':min, 'max':max};
}

export const getMinMaxPriceDT = (products,diff) => {
    let min = 1000, max = 0;

    products.map((product, index) => {
        min = (diff*(product.price-(product.price*product.discount/100)) < min) ? diff*(product.price-(product.price*product.discount/100)) : min;
        max = (diff*(product.price-(product.price*product.discount/100) > max)) ? diff*(product.price-(product.price*product.discount/100)) : max;
    })

    return {'min':min, 'max':max};
}

export const getMinMaxPriceStore = (products,storeid) => {
    const storeproducts=[];
    for(var i=0;i<products.length;i++){
        if(products[i].store==storeid)
            storeproducts.push(products[i]);
    }
    let min = 1000, max = 0;

    storeproducts.map((product, index) => {
        min = (product.price-(product.price*product.discount/100) < min) ? (product.price-(product.price*product.discount/100)) : min;
        max = (product.price-(product.price*product.discount/100) > max) ? (product.price-(product.price*product.discount/100)) : max;
    })

    return {'min':min, 'max':max};
}

export const getMinMaxPriceDTStore = (products,diff,storeid) => {
    const storeproducts=[];
    for(var i=0;i<products.length;i++){
        if(products[i].store==storeid)
            storeproducts.push(products[i]);
    }
    let min = 1000, max = 0;

    storeproducts.map((product, index) => {
        min = (diff*(product.price-(product.price*product.discount/100)) < min) ? diff*(product.price-(product.price*product.discount/100)) : min;
        max = (diff*(product.price-(product.price*product.discount/100) > max)) ? diff*(product.price-(product.price*product.discount/100)) : max;
    })
    return {'min':min, 'max':max};
}


export const getVisibleproducts = (data, category, store, value,valueDT, sortBy,symbol,diff ) => {
    if(symbol.symbol=="DT"){
        return data.products.filter((product,index) => {
            let categoryMatch;
            for(var i=0;i<category.length;i++){
                if(product.category==category[i]){
                    categoryMatch = true;
                break;
                }
                else
                categoryMatch = false;
            }
            let storeMatch;
            for(var j=0;j<store.length;j++){
                if(data.storenames[index]==store[j]){
                    storeMatch = true;
                    break;
                }
                else
                storeMatch = false;
            }
            let PriceMatch;
            if(diff*(product.price-(product.price*product.discount/100))>=valueDT)
                PriceMatch=true;
            else
                PriceMatch=false;
            return categoryMatch || storeMatch || PriceMatch;
        }).sort((product1, product2) => {
            if (sortBy === 'HighToLow') {
                return product2.price-(product2.price*product2.discount/100) < product1.price-(product1.price*product1.discount/100) ? -1 : 1;
            } else if (sortBy === 'LowToHigh') {
                return product2.price-(product2.price*product2.discount/100) > product1.price-(product1.price*product1.discount/100) ? -1 : 1;
            } else if (sortBy === 'Newest') {
                const d1=new Date(product1.creationdate.slice(0,10));
                const d2=new Date(product2.creationdate.slice(0,10));
                return d2< d1? -1 : 1;
            } else if (sortBy === 'Oldest') {
                const d1=new Date(product1.creationdate.slice(0,10));
                const d2=new Date(product2.creationdate.slice(0,10));
                return d2> d1? -1 : 1;
            } else if (sortBy === 'AscOrder') {
                return product1.name.localeCompare(product2.name);
            } else if (sortBy === 'DescOrder') {
                return product2.name.localeCompare(product1.name);
            } else{
                return product2.id > product1.id ? -1 : 1;
            }
        });
    }

    else {
        return data.products.filter(product => {
            let categoryMatch;
            for(var i=0;i<category.length;i++){
                if(product.category==category[i]){
                    categoryMatch = true;
                break;
                }
                else
                categoryMatch = false;
            }
            let storeMatch;
            for(var j=0;j<store.length;j++){
                if(product.store==store[j]){
                    storeMatch = true;
                    break;
                }
                else
                storeMatch = false;
            }
            let PriceMatch;
            if(product.price-(product.price*product.discount/100)>=value)
                PriceMatch=true;
            else
                PriceMatch=false;
            return categoryMatch || storeMatch || PriceMatch;
        }).sort((product1, product2) => {
            if (sortBy === 'HighToLow') {
                return product2.price-(product2.price*product2.discount/100) < product1.price-(product1.price*product1.discount/100) ? -1 : 1;
            } else if (sortBy === 'LowToHigh') {
                return product2.price-(product2.price*product2.discount/100) > product1.price-(product1.price*product1.discount/100)? -1 : 1;
            } else if (sortBy === 'Newest') {
                const d1=new Date(product1.creationdate.slice(0,10));
                const d2=new Date(product2.creationdate.slice(0,10));
                return d2< d1? -1 : 1;
                
            }  else if (sortBy === 'Oldest') {
                const d1=new Date(product1.creationdate.slice(0,10));
                const d2=new Date(product2.creationdate.slice(0,10));
                return d2> d1? -1 : 1;
            }  else if (sortBy === 'AscOrder') {
                return product1.name.localeCompare(product2.name);
            } else if (sortBy === 'DescOrder') {
                return product2.name.localeCompare(product1.name);
            } else{
                return product2.id > product1.id ? -1 : 1;
            }
        });

    }
}
export const getVisibleStoreproducts = (data,storeid,value,valueDT,sortBy,symbol,diff) => {
    const storeproducts=[];
    for(var i=0;i<data.products.length;i++){
        if(data.products[i].store==storeid)
            storeproducts.push(data.products[i]);
    }
    if(symbol.symbol=="DT"){
        return storeproducts.filter((product,index) => {
            let PriceMatch;
            if(diff*(product.price-(product.price*product.discount/100))>=valueDT)
                PriceMatch=true;
            else
                PriceMatch=false;
            return PriceMatch;
        }).sort((product1, product2) => {
            if (sortBy === 'HighToLow') {
                return product2.price-(product2.price*product2.discount/100) < product1.price-(product1.price*product1.discount/100) ? -1 : 1;
            } else if (sortBy === 'LowToHigh') {
                return product2.price-(product2.price*product2.discount/100) > product1.price-(product1.price*product1.discount/100) ? -1 : 1;
            } else if (sortBy === 'Newest') {
                const d1=new Date(product1.creationdate.slice(0,10));
                const d2=new Date(product2.creationdate.slice(0,10));
                return d2< d1? -1 : 1;
            }  else if (sortBy === 'Oldest') {
                const d1=new Date(product1.creationdate.slice(0,10));
                const d2=new Date(product2.creationdate.slice(0,10));
                return d2> d1? -1 : 1;
            }  else if (sortBy === 'AscOrder') {
                return product1.name.localeCompare(product2.name);
            } else if (sortBy === 'DescOrder') {
                return product2.name.localeCompare(product1.name);
            } else{
                return product2.id > product1.id ? -1 : 1;
            }
        });
    }

    else {
        return storeproducts.filter(product => {
            let PriceMatch;
            if(product.price-(product.price*product.discount/100)>=value)
                PriceMatch=true;
            else
                PriceMatch=false;
            return  PriceMatch;
        }).sort((product1, product2) => {
            if (sortBy === 'HighToLow') {
                return product2.price-(product2.price*product2.discount/100) < product1.price-(product1.price*product1.discount/100) ? -1 : 1;
            } else if (sortBy === 'LowToHigh') {
                return product2.price-(product2.price*product2.discount/100) > product1.price-(product1.price*product1.discount/100) ? -1 : 1;
            } else if (sortBy === 'Newest') {
                const d1=new Date(product1.creationdate.slice(0,10));
                const d2=new Date(product2.creationdate.slice(0,10));
                return d2< d1? -1 : 1;
            }  else if (sortBy === 'Oldest') {
                const d1=new Date(product1.creationdate.slice(0,10));
                const d2=new Date(product2.creationdate.slice(0,10));
                return d2> d1? -1 : 1;
            }  else if (sortBy === 'AscOrder') {
                return product1.name.localeCompare(product2.name);
            } else if (sortBy === 'DescOrder') {
                return product2.name.localeCompare(product1.name);
            } else{
                return product2.id > product1.id ? -1 : 1;
            }
        });

    }

}

export const getCartTotal = cartItems => {
    var total = 0;
    for(var i=0; i<cartItems.length; i++){
        total += parseInt(cartItems[i].qty, 10)*(cartItems[i].price-(cartItems[i].price*cartItems[i].discount/100));
    }
    return total;
}

// Get Trending Tag wise Collection
export const getTrendingTagCollection = (products, type, tag) => {
    const items = products.filter(product => {
        return product.category === type && product.tags.includes(tag);
    })
    return items.slice(0,8)
}

// Get Trending Collection
export const getTrendingCollection = (products, type) => {
    const items = products.filter(product => {
        return product.category === type;
    })
    return items.slice(0,8)
}

// Get Special 5 Collection
export const getSpecialCollection = (products, type) => {
    const items = products.filter(product => {
        return product.category === type;
    })
    return items.slice(0,5)
}

// Get TOP Collection
export const getTopCollection = products => {
    const items = products.filter(product => {
        return product.rating > 4;
    })
    return items.slice(0,8)
}

// Get New Products
export const getNewProducts = (products, type) => {
    const items = products.filter(product => {
        return product.new === true && product.category === type;
    })

    return items.slice(0,8)
}

// Get Related Items
export const getRelatedItems = (products, target,id) => {
    let storenames=[];
    const items = products.products.filter(product => {
        return product.category === target && product._id!=id;
    })
    for(var i=0;i<items.length;i++){
        storenames.push(products.storenames[i]);
    }

    return {products:items.slice(0,5),storenames:storenames.slice(0,5)}

}

// Get Best Seller Furniture
export const getBestSellerProducts = (products, type) => {
    const items = products.filter(product => {
        return product.sale === true && product.category === type;
    })

    return items.slice(0,8)
}

// Get Best Seller
export const getBestSeller = products => {
    const items = products.filter(product => {
        return product.sale === true;
    })

    return items.slice(0,8)
}

// Get Mens Wear
export const getMensWear = products => {
    const items = products.filter(product => {
        return product.category === 'men';
    })

    return items.slice(0,8)
}

// Get Womens Wear
export const getWomensWear = products => {
    const items = products.filter(product => {
        return product.category === 'women';
    })

    return items.slice(0,8)
}

// Get Single Product
export const getSingleItem = (products, id) => {

    const items = products.find((element) => {
        return element.id === id;
    })
    return items;
}

// Get Feature Products
export const getFeatureImages = (products, type) => {

    const items = products.filter(product => {
        return product.buisnessDomaine === type;
    })
    return items;
}


