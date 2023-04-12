import React, { FC } from 'react';
import { typedMemo } from 'src/core/utils/typed-memo';
import './Text.scss';
import { Typography } from 'antd';
import { TextProps } from 'antd/es/typography/Text';

import { TextSize, TextColor } from './types';

const { Text: TextAntd } = Typography;

type Props = TextProps & {

  // Размер текста
  size: TextSize;

  // Цвет текста
  color?: TextColor;
};

// Компонент Текст
const TextComponent: FC<Props> = ({ color = TextColor.Main, ...props }: Props) => <TextAntd {...props} className={`text fs_${props.size}_px ${color}_color`}>daw</TextAntd>;

// Компонент Текст
export const Text = typedMemo(TextComponent);
