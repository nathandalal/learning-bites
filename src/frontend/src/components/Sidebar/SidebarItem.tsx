const SidebarItem = ({
   itemText,
   link,
}: {
   itemText: string,
   link: string,
}) => {
  return (
    <li>
       <a href={link ? link : "#"} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
          <span className="flex-1 ml-3 whitespace-nowrap">{itemText}</span>
       </a>
    </li>
  );
}

export default SidebarItem;
