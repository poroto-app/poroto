import {Grid, GridItem, Skeleton} from "@chakra-ui/react";
import styled from "styled-components";
import React from "react";

export const PlanThumbnail = ({imageUrls}: { imageUrls: string[] }) => {

    imageUrls = imageUrls.slice(0, 4);

    const gridAreas = ["A", "B", "C", "D"]
    const gridAreaTemplates = [
        `"A A"
         "A A"`,

        `"A B"
         "A B"`,

        `"A A"\n"B C"`,

        `"A B"\n"C D"`
    ]

    return <Grid
        width="100%" height="300px"
        templateColumns="repeat(2, 1fr)" templateRows="repeat(2, 1fr)"
        gridTemplateAreas={gridAreaTemplates[imageUrls.length - 1]}
        borderRadius="10px" overflow="hidden" cursor="pointer"
    >
        {
            imageUrls.map((url, i) => <GridItem
                key={i}
                w="100%" h="100%" overflow="hidden" position="relative"
                gridArea={gridAreas[i]}
            >
                <Skeleton position="absolute" top="0" right="0" bottom="0" left="0" zIndex="-1"/>
                <Thumbnail src={url}/>
            </GridItem>)
        }
    </Grid>
}

const Thumbnail = styled.img`
  overflow: clip;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;
