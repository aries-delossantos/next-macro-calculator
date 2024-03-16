import "@mantine/charts/styles.css";
import {
  MantineColorsTuple,
  MantineProvider,
  createTheme,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { CalculatorForm } from "./components/Form";

const tomato: MantineColorsTuple = [
  "#fff0e4",
  "#ffe0cf",
  "#fac0a1",
  "#f69e6e",
  "#f28043",
  "#f06d27",
  "#f06418",
  "#d6530c",
  "#bf4906",
  "#a73c00",
];

const brightOrange: MantineColorsTuple = [
  "#fff8e1",
  "#ffefcc",
  "#ffdd9b",
  "#ffca64",
  "#ffba38",
  "#ffb01b",
  "#ffab09",
  "#e39500",
  "#ca8500",
  "#af7100",
];

const theme = createTheme({
  primaryColor: "bright-orange",
  colors: {
    tomato,
    "bright-orange": brightOrange,
  },
});

export default function Home() {
  return (
    <MantineProvider theme={theme}>
      <CalculatorForm />
    </MantineProvider>
  );
}
