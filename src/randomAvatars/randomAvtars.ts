import avocado from './../images/avatars/avocadoAvatar.svg';
import anime from './../images/avatars/animeAvatar.svg';
import batman from './../images/avatars/batmanAvatar.svg';
import coffee from './../images/avatars/avatar-coffee-cup-svgrepo-com.svg';
import builder from './../images/avatars/builderAvatar.svg';
import hipster from './../images/avatars/hipsterAvatar.svg';

const avatars: string[] = [avocado, anime, batman, coffee, builder, hipster];

export const randomAvatar = (): string => {
    const avatarNumber: number =  Math.floor(Math.random() * (avatars.length - 0 + 1)) + 0;

    return avatars[avatarNumber];
}