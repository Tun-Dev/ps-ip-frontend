import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    Input: {
      variants: {
        searchFieldSmall: {
          field: {  
            display: "flex",
            alignItems: "center",         
            width: "212px",
            height: "24px",
            position: "absolute",
            top: "116px",
            left: "24px",
            padding: "4px 107px 4px 8px",
            gap: "var(--spacing-xs)",
            borderRadius: "4px",
            border: "1px solid #D9D9D9",
            backgroundColor: "#FFFFFF",
            opacity: "1",
          },
        },
        textField: {
          field: {
            display: "Flex",
            alignItems: "center",
            width: "296px",
            height: "40px",
            padding: "8px 8px",
            gap: "200px",
            borderRadius: "6px",
            border: "1px solid #EBEBEB",            
            backgroundColor: "#FFFFFF",            
          },
        },
        userNameField:{
          field: {
            width: "480px",
            height: "40px",
            padding: "8px 8px",
            gap: "200px",
            border: "1px solid #EBEBEB",
            borderRadius:"6px",
            backgroundColor: "#FFFFFF"
          },
        },

        textFieldLarge: {
          field: {
            display: "flex",
            alignItems: "center",
            width: "818px",
            height: "40px",            
            padding: "8px 654px 8px 12px",            
            gap: "200px",
            borderRadius: "8px",
            border: "1px solid #EBEBEB",
            backgroundColor: "#FFFFFF",
          },
        },
      },
    },
  },
});

export default theme;
