import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'
import { useContext } from 'react';
import { PublicMoviesContext } from '../../contexts/PublicMoviesProvider';
import { ActionIcon } from '../ActionIcon/ActionIcon';
import { fav, wd, wl, star, watched, wishlist } from '../../helpers/constants';

export const ExploreMoviesItem = ({ item }) => {
    const { onClickPost } = useContext(PublicMoviesContext)
    const { id, primaryImage, originalTitleText } = item;
    return (
        <>
            <div className="item-wrapper" data-testid="item-wrapper">
                <img src={primaryImage?.url} className="item-image" alt="Movie" />
                <h2 className="item-title">{originalTitleText?.text}</h2>
                <div className="actions-wrapper">
                    <Tippy content="Favorites">
                        <button onClick={() => onClickPost(fav, id)}>
                            <ActionIcon iconClass={star} />
                        </button>
                    </Tippy>
                    <Tippy content="Watched">
                        <button onClick={() => onClickPost(wd, id)}>
                            <ActionIcon iconClass={watched} />
                        </button>
                    </Tippy>
                    <Tippy content="Wishlist">
                        <button onClick={() => onClickPost(wl, id)}>
                            <ActionIcon iconClass={wishlist} />
                        </button>
                    </Tippy>
                </div>
            </div>
        </>
    );
};