"use client";

import {
  Card,
  CardBody,
  Icon,
  Tooltip,
  Link,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { FaExternalLinkAlt } from "react-icons/fa";

import { FlagImage } from "@/app/components/Image";
import { COUNTRIES } from "@/app/utils";
import { MONTHS_CS } from "@/app/utils/locales";
import { TripProps } from "@/app/utils/types";

const InfoComponent = ({ data }: { data: TripProps }) => (
  <Card borderTopWidth={4} borderStyle="solid" borderColor="secondary.600">
    <CardBody>
      <List spacing={3}>
        <ListItem fontWeight={500}>
          <Text as="span" mr={2} color="gray.500" fontWeight={400}>
            Kdy /
          </Text>
          {MONTHS_CS[data.month]}, {data.year}
        </ListItem>

        <ListItem fontWeight={500} display="flex" alignItems="center">
          <Text as="span" mr={2} color="gray.500" fontWeight={400}>
            Kde /
          </Text>
          {data.title}, {COUNTRIES[data.countryCode]}
          <FlagImage countryCode={data.countryCode} ml={2} />
        </ListItem>

        {data.accomodation && (
          <ListItem fontWeight={500}>
            <Text as="span" mr={2} color="gray.500" fontWeight={400}>
              Ubytování /
            </Text>
            {data.accomodation.name}
            {data.accomodation.map && (
              <Tooltip label="Otevřít ubýtování na Google Maps">
                <Link
                  href={`https://goo.gl/maps/${data.accomodation.map}`}
                  target="_blank"
                >
                  <Icon
                    as={FaExternalLinkAlt}
                    boxSize={3}
                    ml={2}
                    color="primary.600"
                  />
                </Link>
              </Tooltip>
            )}
          </ListItem>
        )}
      </List>
    </CardBody>
  </Card>
);

export default InfoComponent;
