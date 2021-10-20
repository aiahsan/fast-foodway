let MenuItems={};

export const menuItemsNew = (state = MenuItems, action) => {
    switch (action.type) {
      case 'fetchItems':
        {
        return action.payload;
        }
     
      default:
        return state
    }
  }
  