import { Card as FCard } from "flowbite-react";

const Card = (props) => {
    let nomeClasse = "container mx-auto md:w-2/3 lg:w-1/2 xl:w-1/3 " + props.className;

    return <FCard className={nomeClasse}>{props.children}</FCard>
}

export default Card;