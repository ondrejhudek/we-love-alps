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
import { HiArrowTopRightOnSquare } from "react-icons/hi2";

import { FlagImage } from "@/app/components/Image";
import { COUNTRIES, MONTHS_CS } from "@/app/utils/locales";
import { Trip } from "@/app/utils/types";

const Info = ({ data }: { data: Trip }) => (
  <Card borderTopWidth={4} borderStyle="solid" borderColor="secondary.600">
    <CardBody>
      <List spacing={3}>
        <ListItem fontWeight={500}>
          <Text as="span" mr={2} color="gray.500" fontWeight={400}>
            Kdy /
          </Text>
          {MONTHS_CS[data.month - 1]}, {data.year}
        </ListItem>

        <ListItem fontWeight={500} display="flex" alignItems="center">
          <Text as="span" mr={2} color="gray.500" fontWeight={400}>
            Kde /
          </Text>
          {data.title}, {COUNTRIES[data.country_code]}
          <FlagImage countryCode={data.country_code} ml={2} />
        </ListItem>

        {data.accomodation_name && (
          <ListItem fontWeight={500}>
            <Text as="span" mr={2} color="gray.500" fontWeight={400}>
              Ubytování /
            </Text>
            {data.accomodation_name}
            {data.accomodation_map && (
              <Tooltip label="Otevřít ubýtování na Google Maps">
                <Link
                  href={`https://goo.gl/maps/${data.accomodation_map}`}
                  target="_blank"
                >
                  <Icon
                    as={HiArrowTopRightOnSquare}
                    boxSize={3.5}
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

export default Info;
