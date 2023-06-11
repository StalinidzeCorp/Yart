import React, {FC, useState} from 'react';
import {Work} from 'src/core/models/work';
import {Typography} from 'antd';

import {typedMemo} from '../../core/utils/typed-memo';
import {HeartFillIcon, HeartLineIcon} from '../Icons';
import {Tag} from '../Tag';
import {useCurrentUserStore} from '../../core/store/user/store';
import {useAuthStore} from '../../core/store/auth/store';
import {WorksService} from '../../core/services/works-service';

import classes from './WorkCard.module.scss';
import {NavLink} from "react-router-dom";
import {toUserWorks} from "../../routes/route-links";
import {toast} from "react-toastify";

const {Text} = Typography;

type Props = Readonly<Work & {

  /** Ф-ция, открывающая чтение статьи к=при клике на карточку. */
  onWorkClick: (workId: number) => void;

  /** Id юзера, с которого смотрят работы. */
  pageUserId?: number | string;
}>;

/**
 * Компонент Карточка работы.
 * @param props
 */
const WorkCardComponent: FC<Props> = props => {
  const {isUserAuthorized} = useAuthStore();
  const {user} = useCurrentUserStore();
  const [isLike, setIsLike] = useState(props.workIsLike);

  /** Ф-ция лайка работы. */
  const onWorkLike = () => {
    if (!isUserAuthorized || !user) {
      return null;
    }
    try{
      if (props.workIsLike) {
        WorksService.postWorkUnlike(props.workId, user.userId);
      } else {
        WorksService.postWorkLike(props.workId, user.userId);
      }
      setIsLike(curIsLike => !curIsLike);
    } catch(error){
      toast.error('Произошла ошибка')
    }

  };

  return (
    <div className={`${classes['work-card']}`}
         onClick={() => props.onWorkClick(props.workId)}>
      {props.workImageUrl == null ?
        <div className={`${classes['work-card__content']} ${classes['work-card_textual']}`}>
          <Text className={`${classes['work-card__content_name']}`}>{props.workName}</Text>
          <Text className={`${classes['work-card__content_text']}`}>{props.workStartText}</Text>
        </div> :
        <div className={`${classes['work-card__content']} ${classes['work-card_picture']}`}
             style={{backgroundImage: `url('${props.workImageUrl}')`}}>
          <div className={`${classes['work-card__content_hover']}`}>
            <Text className={`${classes['work-card__content_name']}`}>{props.workName}</Text>
          </div>
        </div>
      }
      <div className={`${classes['work-card__info']}`}>
        {props.pageUserId === undefined &&
          <NavLink to={toUserWorks(props.userId)}>
            <div className={`${classes['work-card__user-info']}`}>
              <div className={`${classes['work-card_user-img']}`}
                   style={{backgroundImage: `url('${props.userImageUrl}')`}}/>
              <Text className={`${classes['work-card_user-full-name']}`}>
                {props.userFirstName} {props.userLastName}
              </Text>
            </div>
          </NavLink>}
        <div className={`${classes['work-card__like']}`} onClick={onWorkLike}>
          {isLike ?
            <HeartFillIcon size={30} fill={'#E61E59'} stroke={'#E61E59'}/> :
            <HeartLineIcon size={30} className={`${classes['work-card__line_icon']}`}/>}
          <Text className={`${classes['work-card__line_count']}`}>{props.workLikesCount}</Text>
        </div>
      </div>
      <div className={`${classes['work-card__tags']}`}>
        {props.workMainSkills.map((skill, i) => (
          <Tag textColor={skill.fontColor} color={skill.backgroundColor} key={i}>{skill.name}</Tag>
        ))}
      </div>
    </div>
  );
};

// Компонент Карточка работы
export const WorkCard = typedMemo(WorkCardComponent);
