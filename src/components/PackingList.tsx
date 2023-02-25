import { Accordion, AccordionItem, AccordionButton, AccordionPanel, Box, Checkbox, Heading, VStack, AccordionIcon, Button, Icon, Divider } from "@chakra-ui/react";
import { ChangeEvent, FunctionComponent, ReactElement, useEffect, useState } from "react";
import { createStore, set, get, clear } from "idb-keyval";
import { formatValue } from "../utils";
import template from "../data/template.json";

interface PackingListProps {}

type PackingList = PackingListCategory[];

interface PackingListCategory {
  name: string;
  items: PackingListItem[];
}

interface PackingListItem {
  label: string;
  value: string;
  checked: boolean;
}

const PackingList: FunctionComponent<PackingListProps> = () => {
  const [packingList, setPackingList] = useState<PackingList>(template);

  const customStore = createStore("packbags-travel", "packing-list");

  useEffect(() => {
    get("packing-list", customStore).then((state) => {
      if (state !== undefined) {
        setPackingList(state);
      }
    });
  }, []);

  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setPackingList((prevList) => {
      const newList = prevList.map((category) => ({
        ...category,
        items: category.items.map((item) => (item.value === value ? { ...item, checked: !item.checked } : item)),
      }));
      set("packing-list", newList, customStore);
      return newList;
    });
  };

  const handleClear = () => {
    clear(customStore);
    setPackingList(template);
  };

  const ResetIcon = (): ReactElement => (
    <Icon viewBox="0 0 24 24">
      <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
        />
      </svg>
    </Icon>
  );

  return (
    <Accordion shadow="md" py={4} rounded="md" bg="white" defaultIndex={[0]} allowMultiple>
      {packingList.map(({ name, items }) => (
        <AccordionItem key={formatValue(name)}>
          <Heading as="h4" noOfLines={1}>
            <AccordionButton>
              <Box as="span" color="cyan.600" fontSize="lg" fontFamily="heading" flex="1" textAlign="left">
                {name}
              </Box>
              <AccordionIcon color="yellow.500" />
            </AccordionButton>
          </Heading>
          <AccordionPanel>
            <VStack align="stretch">
              {items.map(({ label, value, checked }) => (
                <Checkbox colorScheme="cyan" textDecoration={checked ? "line-through" : "initial"} key={value} value={value} isChecked={checked} onChange={handleChange}>
                  {label}
                </Checkbox>
              ))}
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      ))}
      <Divider />
      <Box mt={6} textAlign="center">
        <Button leftIcon={<ResetIcon />} iconSpacing="1" colorScheme="orange" variant="ghost" onClick={handleClear}>
          Reset
        </Button>
      </Box>
    </Accordion>
  );
};

export default PackingList;
