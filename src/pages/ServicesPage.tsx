import { fetchServices } from "../api/ServiceAPI";
import { useEffect, useState } from "react";
import { ServiceSchema } from "../types/Service";

const ServicesPage = () => {
  const [services, setServices] = useState<ServiceSchema[]>([]); // Store the services
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // Fetch services when the component mounts
    const getServices = async () => {
      try {
        const services = await fetchServices();
        setServices(services);
      } catch (error) {
        setError("Could not fetch services");
      }
    };

    getServices();
  }, []); // Empty dependency array means this runs only once when the component mounts

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Services</h1>
      <ul>
        {services.map((service) => (
          <li key={service.id}>
            <h2>{service.name}</h2>
            <p>Status: {service.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServicesPage;

