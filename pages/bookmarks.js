import React from 'react'
import { Typography, Box, Stack } from '@mui/material';
import HeaderTitle from "../src/page-blocks/authForms/HeaderHelper"
import PaddedBlock from "../src/custom-components/PaddedBlock"
import HeaderSection from "../src/page-blocks/search/HeaderSection"
import SearchbarModals from "../src/custom-components/Searchbar/SearchbarModals"
import Footer from "../src/custom-components/Footer"

export default function Bookmarks() {
  return (
    <PaddedBlock>
      <HeaderSection parent={"bookmarks"} breakpoint={800} />
      <Typography sx={styles.title}  component="h1">Bookmarks</Typography>
      <SearchbarModals/>
      <Footer/>
    </PaddedBlock>
  )
}

const styles = {
  title: {
    fontSize:"1.875rem",
    fontWeight: 500,
    mx:2
  }
}