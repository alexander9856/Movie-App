import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'
import { ActionIcon } from '../ActionIcon/ActionIcon'
import { fav, wd, wl, star, watched, wishlist, trash } from '../../helpers/constants'
export const PicksItem = ({ item, onClickAction }) => {
    return (
        <div className="item-wrapper" data-testid="pick-item">
            <img src={item?.primaryImage?.url} className="item-image" alt="Movie" />
            <h2 className="item-title">{item?.originalTitleText?.text}</h2>
            <div className="actions-wrapper">
                <Tippy content="Favorites">
                    <button onClick={() => onClickAction('PATCH', fav, item)}>
                        <ActionIcon iconClass={`${star} ${item.collection === fav ? 'selected' : ""}`} />
                    </button>
                </Tippy>
                <Tippy content="Watched">
                    <button onClick={() => onClickAction('PATCH', wd, item)}>
                        <ActionIcon iconClass={`${watched} ${item.collection === wd ? 'selected' : ""}`} />
                    </button>
                </Tippy>
                <Tippy content="Wishlist">
                    <button onClick={() => onClickAction('PATCH', wl, item)}>
                        <ActionIcon iconClass={`${wishlist} ${item.collection === wl ? 'selected' : ""}`} />
                    </button>
                </Tippy>

                <Tippy content="Remove from collection">
                    <button onClick={() => onClickAction('DELETE', null, item)}>
                        <ActionIcon iconClass={trash} />
                    </button>
                </Tippy>
            </div>
        </div>
    );
};