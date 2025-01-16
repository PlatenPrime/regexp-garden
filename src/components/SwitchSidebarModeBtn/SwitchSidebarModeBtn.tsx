import ShowAllLevelsIcon from "@public/assets/icons/show-all-levels.svg";
import CloseIcon from "@public/assets/icons/close.svg";
import { observer } from "mobx-react-lite";
import { sidebarModeToggle } from "@/utils/toggle/sidebarModeToggle";
import { SidebarMode } from "@/utils/consts";

export const SwitchSidebarModeBtn: React.FC = observer(() => {
  if (sidebarModeToggle.currentState === SidebarMode.ShowCurrentLevel) {
    return (
      <button className="nav-btn" onClick={() => sidebarModeToggle.toggle()}>
        <ShowAllLevelsIcon />
      </button>
    );
  }

  return (
    <div className="flex cursor-pointer h-8 min-h-8 w-8 min-w-8">
      <CloseIcon onClick={() => sidebarModeToggle.toggle()} />
    </div>
  );
});
