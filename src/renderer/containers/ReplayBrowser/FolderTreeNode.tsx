import { useReplays } from "@/store/replays";
import { FolderResult } from "common/replayBrowser";
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import FolderIcon from "@material-ui/icons/Folder";
import { colors } from "common/colors";

export interface FolderTreeNodeProps extends FolderResult {
  nestLevel?: number;
}

export const FolderTreeNode: React.FC<FolderTreeNodeProps> = ({
  nestLevel = 0,
  name,
  subdirectories,
  fullPath,
  collapsed,
}) => {
  const loadDirectoryList = useReplays((store) => store.loadDirectoryList);
  const processFolder = useReplays((store) => store.processFolder);
  const toggleFolder = useReplays((store) => store.toggleFolder);
  const currentFolder = useReplays((store) => store.currentFolder);
  const hasChildren = subdirectories.length > 0;
  const onClick = async () => {
    console.log(`loading directory: ${name}`);
    // console.log(app.getAppPath());
    loadDirectoryList(fullPath);
    processFolder(fullPath);
  };
  const isSelected = currentFolder === fullPath;
  const labelColor = isSelected ? colors.grayDark : "rgba(255, 255, 255, 0.5)";
  return (
    <div>
      <ListItem
        onClick={onClick}
        button={true}
        style={{
          backgroundColor: isSelected ? colors.greenPrimary : undefined,
          color: labelColor,
          padding: 0,
          paddingLeft: nestLevel * 15,
        }}
      >
        <ListItemIcon>
          <IconButton
            size="small"
            style={{ color: labelColor }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (!hasChildren) {
                onClick();
              } else {
                toggleFolder(fullPath);
              }
            }}
          >
            {!hasChildren ? (
              <FolderIcon fontSize="small" />
            ) : collapsed ? (
              <KeyboardArrowDownIcon fontSize="small" />
            ) : (
              <KeyboardArrowUpIcon fontSize="small" />
            )}
          </IconButton>
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{
            style: {
              whiteSpace: "nowrap",
              cursor: "pointer",
              marginLeft: 10,
              fontWeight: isSelected ? "bold" : "normal",
            },
          }}
          primary={name}
        />
      </ListItem>
    </div>
  );
};
