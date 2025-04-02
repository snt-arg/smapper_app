import { JSX } from "react";
import { ServiceSchema } from "../../types/Service";

export default function ServiceItem(item: ServiceSchema): JSX.Element {
  return (<>
    <h1>{item.name}</h1>
    <h2>{item.status}</h2>
  </>);
}
