const Divider = (props) => {
    let nomeClasse = "w-full my-1 border-gray-200 sm:mx-auto dark:border-gray-700 " + props.className;

    return <hr class={nomeClasse} />
}

export default Divider;