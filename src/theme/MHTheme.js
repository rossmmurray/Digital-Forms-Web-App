import { createMuiTheme } from '@material-ui/core/styles'
// import red from 'material-ui/colors/red';

import amber from '@material-ui/core/colors/amber';

export const MHTheme = createMuiTheme({
    palette: {
        primary: {
            main: "#005eb8"
        },
        secondary: amber
        // deleteColor: red[600]
    },
  })