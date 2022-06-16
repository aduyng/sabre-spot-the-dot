import React, { useImperativeHandle, useRef } from "react";
import { DragSource, DropTarget } from "react-dnd";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import { bool, func, shape, string } from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles({
  root: {
    cursor: "move"
  },
  dragging: {
    opacity: 0
  }
});

const Column = React.forwardRef(
  ({ column, isDragging, connectDragSource, connectDropTarget, onToggle }, ref) => {
    const classes = useStyles();

    const elementRef = useRef(null);
    connectDragSource(elementRef);
    connectDropTarget(elementRef);
    useImperativeHandle(ref, () => ({
      getNode: () => elementRef.current
    }));

    return (
      <ListItem ref={elementRef} className={clsx(classes.root, { [classes.dragging]: isDragging })}>
        <ListItemIcon>
          <Checkbox
            edge="start"
            tabIndex={-1}
            disableRipple
            checked={column.selected || false}
            onChange={onToggle}
          />
        </ListItemIcon>
        <ListItemText primary={column.label} />
      </ListItem>
    );
  }
);

Column.propTypes = {
  column: shape({ id: string.isRequired, label: string.isRequired, selected: bool }).isRequired,
  isDragging: bool,
  onToggle: func.isRequired,
  connectDragSource: func.isRequired,
  connectDropTarget: func.isRequired
};

Column.defaultProps = {
  isDragging: false
};

export default DropTarget(
  "column",
  {
    hover({ index: hoverIndex, moveColumn }, monitor, component) {
      if (!component) {
        return null;
      }
      const node = component.getNode();
      if (!node) {
        return null;
      }
      const dragIndex = monitor.getItem().index;
      if (dragIndex === hoverIndex) {
        return null;
      }
      const hoverBoundingRect = node.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return null;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return null;
      }
      moveColumn(dragIndex, hoverIndex);
      // eslint-disable-next-line no-param-reassign
      monitor.getItem().index = hoverIndex;
      return null;
    }
  },
  connect => ({
    connectDropTarget: connect.dropTarget()
  })
)(
  DragSource(
    "column",
    {
      beginDrag: props => ({
        id: props.id,
        index: props.index
      })
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    })
  )(Column)
);
