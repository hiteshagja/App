import CONST from '../CONST';
import colors from './colors';
import variables from './variables';
import themeColors from './themes/default';

export default (type, windowDimensions, popoverAnchorPosition = {}) => {
    const {isSmallScreenWidth, windowWidth} = windowDimensions;

    let modalStyle = {
        margin: 0,
    };

    let modalContainerStyle;
    let swipeDirection;
    let animationIn;
    let animationOut;
    let hideBackdrop = false;
    let shouldAddBottomSafeAreaPadding = false;
    let shouldAddTopSafeAreaPadding = false;

    switch (type) {
        case CONST.MODAL.MODAL_TYPE.CENTERED:
            // A centered modal is one that has a visible backdrop
            // and can be dismissed by clicking outside of the modal.
            // This modal should take up the entire visible area when
            // viewed on a smaller device (e.g. mobile or mobile web).
            modalStyle = {
                ...modalStyle,
                ...{
                    alignItems: 'center',
                },
            };
            modalContainerStyle = {
                // Shadow Styles
                shadowColor: colors.black,
                shadowOffset: {
                    width: 0,
                    height: 0,
                },
                shadowOpacity: 0.1,
                shadowRadius: 5,

                flex: 1,
                marginTop: isSmallScreenWidth ? 0 : 20,
                marginBottom: isSmallScreenWidth ? 0 : 20,
                borderRadius: isSmallScreenWidth ? 0 : 12,
                borderWidth: isSmallScreenWidth ? 1 : 0,
                overflow: 'hidden',
                width: isSmallScreenWidth ? '100%' : windowWidth - 40,
            };

            // The default swipe direction is swipeDown and by
            // setting this to undefined we effectively disable the
            // ability to swipe our modal
            swipeDirection = undefined;
            animationIn = isSmallScreenWidth ? 'slideInRight' : 'fadeIn';
            animationOut = isSmallScreenWidth ? 'slideOutRight' : 'fadeOut';
            shouldAddTopSafeAreaPadding = true;
            break;
        case CONST.MODAL.MODAL_TYPE.BOTTOM_DOCKED:
            modalStyle = {
                ...modalStyle,
                ...{
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                },
            };
            modalContainerStyle = {
                width: '100%',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                paddingTop: 12,
                paddingBottom: 12,
                justifyContent: 'center',
                overflow: 'hidden',
            };

            shouldAddBottomSafeAreaPadding = true;
            swipeDirection = undefined;
            animationIn = 'slideInUp';
            animationOut = 'slideOutDown';
            break;
        case CONST.MODAL.MODAL_TYPE.POPOVER:
            modalStyle = {
                ...modalStyle,
                ...popoverAnchorPosition,
                ...{
                    position: 'absolute',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                },
            };
            modalContainerStyle = {
                width: variables.sideBarWidth - 40,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: themeColors.border,
                paddingTop: 12,
                paddingBottom: 12,
                justifyContent: 'center',
                overflow: 'hidden',
                boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.025)',
            };

            hideBackdrop = true;
            swipeDirection = undefined;
            animationIn = 'fadeInLeft';
            animationOut = 'fadeOutLeft';
            break;
        case CONST.MODAL.MODAL_TYPE.RIGHT_DOCKED:
            modalStyle = {
                ...modalStyle,
                ...{
                    marginLeft: isSmallScreenWidth ? 0 : windowWidth - variables.sideBarWidth,
                    width: isSmallScreenWidth ? '100%' : variables.sideBarWidth,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                },
            };
            modalContainerStyle = {
                width: isSmallScreenWidth ? '100%' : variables.sideBarWidth,
                height: '100%',
                overflow: 'hidden',
            };

            animationIn = {
                from: {
                    translateX: isSmallScreenWidth ? windowWidth : variables.sideBarWidth,
                },
                to: {
                    translateX: 0,
                },
            };
            animationOut = {
                from: {
                    translateX: 0,
                },
                to: {
                    translateX: isSmallScreenWidth ? windowWidth : variables.sideBarWidth,
                },
            };
            swipeDirection = undefined;
            shouldAddBottomSafeAreaPadding = true;
            shouldAddTopSafeAreaPadding = true;
            break;
        default:
            modalStyle = {};
            modalContainerStyle = {};
            swipeDirection = 'down';
            animationIn = 'slideInUp';
            animationOut = 'slideOutDown';
    }

    return {
        modalStyle,
        modalContainerStyle,
        swipeDirection,
        animationIn,
        animationOut,
        hideBackdrop,
        shouldAddBottomSafeAreaPadding,
        shouldAddTopSafeAreaPadding,
    };
};
