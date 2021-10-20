import { size , colors , fonts } from "../../assets/styletile"

export default styles = {
    container: {
      backgroundColor: "white",
      padding: "4%",
      marginVertical: 5,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.13,
      shadowRadius: 2.62,
      shadowColor: colors.border,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41, elevation: 1,
    },
    spacebetween: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    smallHeading: {
      fontSize: size.paragraph,
      color: "black",
      marginBottom: "3%",
      fontFamily: fonts.primaryBold,
    },
    textContent: {
      fontSize: size.content,
      color: "black",
      fontFamily: fonts.primary,
    },
    textRed: {
      fontSize: 14,
      color: colors.primary,
      fontFamily: fonts.primaryBold,
    },
  }