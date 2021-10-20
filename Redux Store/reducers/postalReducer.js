let postalCode=[];

export const postalReducer = (state = postalCode, action) => {
    switch (action.type) {
      case 'fetchPostal':
        {
        return action.payload;
        }
     
      default:
        return state
    }
  }
  